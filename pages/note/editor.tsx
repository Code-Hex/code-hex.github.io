import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor, { Monaco, useMonaco } from '@monaco-editor/react';
import * as MDX from '@mdx-js/react';
import mdx from '@mdx-js/mdx';
import { remove } from 'unist-util-remove';
import Note from '~/components/Note';
import { Plugin, Pluggable } from 'unified';
import esbuild from '~/esbuild/esbuild';
import { useLanguageLoader } from 'monaco/hooks';
import { SetupEditor } from 'monaco/monaco';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { SidebarLayout } from '~/components/Resize';

// Store details about typings we have loaded
const extraLibs = new Map();

interface Typings {
  [key: string]: string;
}

interface WorkerResponse {
  name: string;
  version: string;
  typings: Typings;
}

const addTypings = (m: Monaco, { typings }: WorkerResponse) => {
  Object.keys(typings).forEach((path) => {
    let extraLib = extraLibs.get(path);

    extraLib && extraLib.dispose();
    extraLib = m.languages.typescript.javascriptDefaults.addExtraLib(
      typings[path],
      path
    );

    extraLibs.set(path, extraLib);
  });
};

const EditorPage = () => {
  const m = useMonaco();
  const [value, setValue] = useState<string | undefined>();
  const markdown = useLanguageLoader('markdown');
  const [compiledSrc, setCompiledSrc] = useState<string | undefined>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>();
  const typingsWorkerRef = useRef<Worker | undefined>();

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    // editor.deltaDecorations()
  }, [editorRef]);

  useEffect(() => {
    if (!m) return;

    (async () => {
      const worker = new Worker(
        new URL('~/worker/typings.worker.js', import.meta.url)
      );
      worker.addEventListener(
        'message',
        ({ data }: { data: WorkerResponse }) => {
          addTypings(m, data);
        }
      );

      const dependencies: { [key: string]: string } = {
        react: '17.0.2',
        'react-dom': '17.0.2',
      };

      Object.keys(dependencies).forEach((name) =>
        worker.postMessage({
          name,
          version: dependencies[name],
        })
      );

      typingsWorkerRef.current = worker;
    })();

    // cleanup
    return () => {
      typingsWorkerRef.current?.terminate();
    };
  }, [m]);

  useEffect(() => {
    if (!value) return;
    (async () => {
      try {
        const src = await CompileMdx(value, {});
        setCompiledSrc(src);
      } catch (err) {
        console.error('mdx error:', err.message);
      }
    })();
  }, [value]);

  const Preview = useMemo(() => {
    if (!compiledSrc) return Fragment;

    const fullScope = { mdx: MDX.mdx, React, Note };
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    try {
      const hydrateFn = Reflect.construct(
        Function,
        keys.concat([compiledSrc, 'return MDXContent'].join('\n'))
      );
      return hydrateFn.apply(hydrateFn, values);
    } catch (err) {
      console.error(`hydrate: ${err.message}`);
    }
  }, [compiledSrc]);

  if (markdown.loading) {
    return <div>loading...</div>;
  }

  const { loaded: markdownLanguage } = markdown;
  if (!markdownLanguage) {
    console.error(`error markdown is loading: ${markdown.error}`);
    return <div>See console</div>;
  }

  return (
    <div className="w-full h-full fixed">
      <SidebarLayout defaultSidebarWidth={400}>
        <div className="items-center overflow-y-hidden">
          <Editor
            defaultValue={getSampleCodeForLanguage()}
            defaultLanguage="mdx"
            theme="monokai"
            onChange={(value) => {
              setValue(value);
            }}
            beforeMount={(monaco) => SetupEditor(monaco, markdownLanguage)}
            onMount={(editor) => {
              editorRef.current = editor;
              setValue(editor.getValue());
            }}
            options={{
              minimap: {
                enabled: true,
              },
            }}
          />
        </div>
        <div className="h-full overflow-y-scroll">
          <div className="">{<Preview />}</div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });

function getSampleCodeForLanguage(): string {
  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  return `\
export const meta = {
  title: '',
  date: '${now}',
  tags: []
}

<Component>{/* comment */}</Component>


// # Hello, *world*!

// Below is an example of JSX embedded in Markdown. <br /> **Try and change
// the background color!**

<div style={{ padding: '20px', backgroundColor: 'tomato' }}>
  <h3>This is JSX</h3>
</div>
`;
}

/**
 * remark plugin which removes all import and export statements
 */
const removeImportsExportsPlugin: Plugin = () => (tree: any) =>
  remove(tree, ['import', 'export']);

interface CompileMDXOptions {
  mdxOptions?: mdx.Options;
}

// TODO(codehex): fix prism highlight for running on browser
const { remarkPlugins } = require('~/remark/remarkPlugins');

const CompileMdx = async (
  src: string,
  { mdxOptions = {} }: CompileMDXOptions
): Promise<string> => {
  mdxOptions.remarkPlugins = [
    ...(mdxOptions.remarkPlugins || (remarkPlugins as Pluggable[])),
    removeImportsExportsPlugin,
  ];

  // TODO(codehex): error handling. e.g. SyntaxError
  console.log('start compile...');
  const compiledMdx = await mdx(src, { ...mdxOptions, skipExport: true });
  console.log(compiledMdx);

  const { code } = await esbuild.transform(compiledMdx, {
    loader: 'jsx',
    jsxFactory: 'mdx',
    minify: true,
    target: ['es2020', 'node12'],
  });

  return code;
};

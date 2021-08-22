import React, { Fragment, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor from '@monaco-editor/react';
import * as MDX from '@mdx-js/react';
import mdx from '@mdx-js/mdx';
import { remove } from 'unist-util-remove';
import Note from '~/components/Note';
import { Plugin, Pluggable } from 'unified';
import esbuild from '~/esbuild/esbuild';
import { useLanguageLoader } from 'monaco/hooks';
import { SetupEditor } from 'monaco/monaco';

const EditorPage = () => {
  const [value, setValue] = useState<string | undefined>();
  const markdown = useLanguageLoader('markdown');
  const [compiledSrc, setCompiledSrc] = useState<string | undefined>();

  useEffect(() => {
    if (!value) return;

    (async () => {
      try {
        setCompiledSrc(await CompileMdx(value, {}));
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

    const hydrateFn = Reflect.construct(
      Function,
      keys.concat([compiledSrc, 'return MDXContent'].join('\n'))
    );
    return hydrateFn.apply(hydrateFn, values);
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
    <div className="w-full h-full flex flex-row fixed">
      <div className="w-1/2 items-center overflow-y-hidden">
        <Editor
          defaultValue={getSampleCodeForLanguage()}
          defaultLanguage="mdx"
          theme="vs-dark"
          onChange={(value, _) => setValue(value)}
          beforeMount={(monaco) => SetupEditor(monaco, markdownLanguage)}
          onMount={(editor) => setValue(editor.getValue())}
          options={{
            minimap: {
              enabled: true,
            },
          }}
        />
      </div>
      <div className="w-1/2 h-full overflow-y-scroll">
        <div className="">{<Preview />}</div>
      </div>
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


# Hello, *world*!

Below is an example of JSX embedded in Markdown. <br /> **Try and change
the background color!**

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

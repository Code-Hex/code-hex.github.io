import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor from '@monaco-editor/react';
import { compile, CompileOptions } from '@mdx-js/mdx';
import { remove } from 'unist-util-remove';
import { NoteContent } from '~/components/Note';
import { Plugin, Pluggable } from 'unified';
import esbuild from '~/lib/esbuild';
import { useLanguageLoader } from '~/monaco/hooks';
import { SetupEditor } from '~/monaco/monaco';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { SidebarLayout } from '~/components/Resize';
import remarkPlugins from '~/lib/remarkPlugins';
import { LoopVideo } from '~/components/MDXVideo';
import { Information } from '~/components/Feedback';

const EditorPage = () => {
  const [value, setValue] = useState<string | undefined>();
  const markdown = useLanguageLoader('markdown');
  const [mdxResult, setMdxResult] = useState<MDXResult | undefined>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>();

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    // editor.deltaDecorations()
  }, [editorRef]);

  useEffect(() => {
    if (!value) return;
    const compileWithDelay = setTimeout(() => {
      (async () => {
        try {
          const result = await compileMdx(value);
          setMdxResult(result);
        } catch (err) {
          console.error('mdx error:', err);
        }
      })();
    }, 1000);
    return () => clearTimeout(compileWithDelay);
  }, [value]);

  const Preview = useMemo(() => {
    if (!mdxResult) return Fragment;

    const fullScope = { React };
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    const esmRun = Reflect.construct(
      Function,
      keys.concat([mdxResult.code].join('\n'))
    );
    const result = esmRun.apply(esmRun, values);
    const MDXContent = result.default;

    // eslint-disable-next-line react/display-name
    return () => (
      <NoteContent
        meta={result.meta}
        components={{ LoopVideo, Information }}
        bookmarkCount={0}
      >
        <MDXContent />
      </NoteContent>
    );
  }, [mdxResult]);

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
      <SidebarLayout defaultSidebarWidth={window.innerWidth / 2}>
        <div className="items-center overflow-y-hidden">
          <Editor
            defaultValue={getSampleCodeForLanguage()}
            defaultLanguage="mdx"
            theme="monokai"
            onChange={(value) => setValue(value)}
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
        <div className="h-screen overflow-y-scroll">
          <Preview />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });

function getSampleCodeForLanguage(): string {
  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
  return `\
export const meta = {
  title: 'Title',
  description: 'description is here',
  date: '${now}',
  tags: []
}

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

interface MDXResult {
  code: string;
}

const compileMdx = async (src: string): Promise<MDXResult> => {
  const options: CompileOptions = {
    outputFormat: 'function-body',
    jsx: true,
    remarkPlugins: [
      ...(remarkPlugins as Pluggable[]),
      removeImportsExportsPlugin,
    ],
  };

  // TODO(codehex): error handling. e.g. SyntaxError
  const transpiled2JSX = await compile(src, options);

  const { code } = await esbuild.transform(transpiled2JSX.value, {
    loader: 'jsx',
    jsxFactory: 'React.createElement',
    minify: true,
    target: ['esnext', 'node12'],
  });

  return {
    code,
  };
};

// const meta = {
//   title: 'Title',
//   description: 'description is here',
//   date: '2022-04-20T11:35:39+09:00',
//   tags: []
// };
// function MDXContent(props = {}) {
//   const {wrapper: MDXLayout} = props.components || ({});
//   return MDXLayout ? <MDXLayout {...props}><_createMdxContent /></MDXLayout> : _createMdxContent();
//   function _createMdxContent() {
//     const _components = Object.assign({
//       p: "p",
//       em: "em",
//       strong: "strong"
//     }, props.components);
//     return <><_components.p>{"// # Hello, "}<_components.em>{"world"}</_components.em>{"!"}</_components.p>{"\n"}<_components.p>{"// Below is an example of JSX embedded in Markdown. "}<br />{" "}<_components.strong>{"Try and change\n// the background color!"}</_components.strong></_components.p>{"\n"}<div style={{
//       padding: '20px',
//       backgroundColor: 'tomato'
//     }}><h3>{"This is JSX"}</h3></div></>;
//   }
// }
// return {
//   meta,
//   default: MDXContent
// };
// "

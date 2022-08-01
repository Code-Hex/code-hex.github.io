import React, {
  ComponentType,
  FC,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor, { useMonaco } from '@monaco-editor/react';
import { compileSync, runSync } from '@mdx-js/mdx';
import { NoteContent } from '~/components/Note';
import { Pluggable } from 'unified';
import * as runtime from 'react/jsx-runtime';
import { SetupEditor } from '~/monaco/monaco';
import { SidebarLayout } from '~/components/Resize';
import remarkPlugins from '~/lib/remarkPlugins';
import { LoopVideo } from '~/components/MDXVideo';
import { Information } from '~/components/Feedback';
import { Metadata } from '~/mdx/config';
import Prism from 'prismjs';
import { SuspenseReader, useSuspense } from 'src/hooks/suspense';
import { MonacoLanguageLoaderResult } from '~/monaco/types';

interface MDXCompileStatus {
  content?: ComponentType;
  meta?: Metadata;
  error?: Error;
}

const useMDXPreview = (src?: string): MDXCompileStatus => {
  return useMemo(() => {
    try {
      const compiledSrc = compileSync(src ?? '', {
        outputFormat: 'function-body',
        remarkPlugins: [...(remarkPlugins as Pluggable[])],
      });
      const result = runSync(compiledSrc.value, runtime);
      return {
        content: result.default,
        meta: result.meta,
      };
    } catch (err) {
      return {
        error: err as Error,
      };
    }
  }, [src]);
};

const EditorPage = () => {
  const m = useMonaco();
  const languageId = 'markdown';
  const language = m?.languages
    .getLanguages()
    .find((lang) => lang.id === languageId);

  if (!language) {
    return <div>loading...</div>;
  }

  const loader = useSuspense(
    (async () => {
      const loaded = await (language as any).loader();
      return loaded as MonacoLanguageLoaderResult;
    })()
  );

  return (
    <Suspense fallback={<div>loading...</div>}>
      <EditorContent languageReader={loader} />
    </Suspense>
  );
};

export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });

interface EditorContentProps {
  languageReader: SuspenseReader<MonacoLanguageLoaderResult>;
}

const EditorContent: FC<EditorContentProps> = ({ languageReader }) => {
  const markdownLanguage = languageReader.read();
  const [mdxSrc, setMdxSrc] = useState<string | undefined>();
  const [value, setValue] = useState<string | undefined>();
  const status = useMDXPreview(mdxSrc);

  useEffect(() => {
    if (!value) return;
    const compileWithDelay = setTimeout(() => {
      setMdxSrc(value);
      Prism.highlightAll();
    }, 1000);
    return () => clearTimeout(compileWithDelay);
  }, [value]);

  return (
    <div className="w-full h-full fixed">
      <SidebarLayout defaultSidebarWidth={window.innerWidth / 2}>
        <div className="items-center overflow-y-hidden">
          <Editor
            defaultValue={getSampleCodeForLanguage()}
            defaultLanguage="mdx"
            theme="monokai"
            onChange={(v) => setValue(v)}
            beforeMount={(monaco) => SetupEditor(monaco, markdownLanguage)}
            onMount={(editor) => setValue(editor.getValue())}
            options={{
              minimap: {
                enabled: true,
              },
            }}
          />
        </div>
        <div className="h-screen overflow-y-scroll">
          {status.error && (
            <div className="p-2 whitespace-pre-wrap">{`${status.error}`}</div>
          )}
          {status.content && status.meta && (
            <NoteContent
              meta={status.meta}
              components={{ LoopVideo, Information }}
              bookmarkCount={0}
              hideAdSense
            >
              <status.content />
            </NoteContent>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
};

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

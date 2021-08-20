import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor, { useMonaco } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const EditorPage = () => {
  const m = useMonaco();
  const markdown = useLanguageLoader('markdown');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!m || markdown.loading) {
      return;
    }
    if (markdown.error) throw markdown.error;

    m.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: m.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: m.languages.typescript.ModuleResolutionKind.NodeJs,
      module: m.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ['node_modules/@types'],
      jsx: m.languages.typescript.JsxEmit.React,
      jsxFactory: 'JSXAlone.createElement',
    });

    const mdxLanguage = Object.assign({}, markdown.loaded?.language);
    const mdxConf = Object.assign({}, markdown.loaded?.conf);

    // setup
    mdxLanguage.tokenizer.linecontent.push(
      { include: 'jsxModule' },
      { include: 'jsxTag' }
    );

    // jsx-module
    mdxLanguage.tokenizer.jsxModule = [
      [
        /^(import|export)\b/,
        {
          token: 'keyword.javascript',
          next: '@embeddedJsxModule',
          nextEmbedded: 'javascript',
        },
      ],
    ];
    mdxLanguage.tokenizer.embeddedJsxModule = [
      [/^\s*$/, { token: '', next: '@pop', nextEmbedded: '@pop' }],
    ];

    // jsx-tag
    mdxLanguage.tokenizer.jsxTag = [
      [
        /^(?=< *([a-zA-Z]\w*))/,
        {
          token: 'keyword.javascript',
          next: '@embeddedJsxTag',
          nextEmbedded: 'javascript',
        },
      ],
    ];
    mdxLanguage.tokenizer.embeddedJsxTag = [
      [/(?<=>)/, { token: '', next: '@pop', nextEmbedded: '@pop' }],
    ];

    m.languages.register({
      id: 'mdx',
      extensions: ['.mdx'],
      aliases: ['Markdown React'],
    });
    m.languages.setMonarchTokensProvider('mdx', mdxLanguage);
    m.languages.setLanguageConfiguration('mdx', mdxConf);

    setLoading(false);
  }, [m, markdown]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Editor
      height="100vh"
      defaultValue={getSampleCodeForLanguage()}
      defaultLanguage="mdx"
      theme="vs-dark"
      options={{
        minimap: {
          enabled: true,
        },
      }}
    />
  );
};

interface MonacoLanguageLoaderResult {
  language: monaco.languages.IMonarchLanguage;
  conf: monaco.languages.LanguageConfiguration;
}

interface LanguageLoaderState {
  loaded?: MonacoLanguageLoaderResult;
  loading: boolean;
  error?: Error;
}

const useLanguageLoader = (languageId: string): LanguageLoaderState => {
  const m = useMonaco();
  const [result, setResult] = useState<MonacoLanguageLoaderResult | undefined>(
    undefined
  );

  if (!m) {
    return {
      loading: true,
    };
  }

  const language = m.languages
    .getLanguages()
    .find((lang) => lang.id === languageId);

  if (!language) {
    return {
      loading: false,
      error: new Error(`unexpected language: ${languageId}`),
    };
  }

  (async () => {
    const loaded = await (language as any).loader();
    setResult(loaded as MonacoLanguageLoaderResult);
  })();

  return {
    loaded: result,
    loading: !result,
  };
};

export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });

function getSampleCodeForLanguage(): string {
  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  return `\
import Component from './component'

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

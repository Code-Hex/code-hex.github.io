import React, { Fragment, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Editor, { useMonaco } from '@monaco-editor/react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as MDX from '@mdx-js/react';
import mdx from '@mdx-js/mdx';
import { remove } from 'unist-util-remove';
import Note from '~/components/Note';
import { Plugin, Pluggable } from 'unified';
import esbuild from '~/esbuild/esbuild';

const EditorPage = () => {
  const m = useMonaco();
  const [value, setValue] = useState<string | undefined>();
  const markdown = useLanguageLoader('markdown');
  const [loading, setLoading] = useState<boolean>(true);
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

    mdxLanguage.tokenizer.html = [];

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

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-row fixed">
      <div className="w-1/2 items-center overflow-y-hidden">
        <Editor
          defaultValue={getSampleCodeForLanguage()}
          defaultLanguage="mdx"
          theme="vs-dark"
          onChange={(value, _) => setValue(value)}
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

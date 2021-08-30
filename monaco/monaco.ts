import { monokaiTheme } from './monokai';
import { Monaco } from '@monaco-editor/react';
import { MonacoLanguageLoaderResult } from './types';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// https://github.com/mdx-js/vscode-mdx/blob/master/language-configuration.json
const mdxConf: monaco.languages.LanguageConfiguration = {
  comments: {
    blockComment: ['<!--', '-->'],
  },
  // symbols used as brackets
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  // symbols that are auto closed when typing
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '`', close: '`' },
    { open: '"', close: '"', notIn: ['string'] },
    { open: "'", close: "'", notIn: ['string'] },
    { open: '/**', close: ' */', notIn: ['string'] },
    { open: '<!--', close: '-->', notIn: ['string', 'comment'] },
    { open: '<', close: '>', notIn: ['string'] },
  ],
  // symbols that that can be used to surround a selection
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: '<', close: '>' },
    { open: '_', close: '_' },
    { open: '*', close: '*' },
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '`', close: '`' },
  ],
  folding: {
    offSide: true,
    markers: {
      start: new RegExp('^\\s*<!--\\s*#?region\\b.*-->'),
      end: new RegExp('^\\s*<!--\\s*#?endregion\\b.*-->'),
    },
  },
};

export const SetupEditor = (
  m: Monaco,
  markdown: MonacoLanguageLoaderResult
) => {
  const compilerOptions = {
    target: m.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: m.languages.typescript.ModuleResolutionKind.NodeJs,
    module: m.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: m.languages.typescript.JsxEmit.React,
    allowJs: true,
    reactNamespace: 'React',
  };

  m.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);

  m.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  /**
   * Sync all the models to the worker eagerly.
   * This enables intelliSense for all files without needing an `addExtraLib` call.
   */
  m.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  const mdxLanguage = Object.assign({}, markdown.language);

  // setup
  const mdTokenizerLineContent = mdxLanguage.tokenizer.linecontent.splice(0, mdxLanguage.tokenizer.linecontent.length - 1) // { include: 'html' }
  mdTokenizerLineContent.push(
    { include: 'jsxModule' },
    { include: 'jsxTag' },
    { include: 'html' }
  );
  mdxLanguage.tokenizer.linecontent = mdTokenizerLineContent

  // mdxLanguage.tokenizer.html = [];

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
      /^(?=< *([a-zA-Z]\\w*))/,
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

  m.editor.defineTheme("monokai", monokaiTheme)

  m.languages.register({
    id: 'mdx',
    extensions: ['.mdx'],
    aliases: ['Markdown React'],
  });
  m.languages.setMonarchTokensProvider('mdx', mdxLanguage);
  m.languages.setLanguageConfiguration('mdx', mdxConf);
};
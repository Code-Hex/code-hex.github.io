import { Monaco } from "@monaco-editor/react";
import { MonacoLanguageLoaderResult } from "./types";

export const SetupEditor = (m: Monaco, markdown: MonacoLanguageLoaderResult) => {
  m.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: m.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: m.languages.typescript.ModuleResolutionKind.NodeJs,
    module: m.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types'],
    jsx: m.languages.typescript.JsxEmit.React,
    allowJs: true,
    reactNamespace: 'React',
  });

  m.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  const mdxLanguage = Object.assign({}, markdown.language);
  const mdxConf = Object.assign({}, markdown.conf);

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
};
import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useMonaco } from '@monaco-editor/react';
import {
  createOnigScanner,
  createOnigString,
  loadWASM,
} from 'vscode-oniguruma';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  ScopeName,
  SimpleLanguageInfoProvider,
  ScopeNameInfo,
  TextMateGrammar,
} from 'monaco/providers';
import { LanguageId, registerLanguages } from 'monaco/register';
import { rehydrateRegexps } from 'monaco/configuration';
import VsCodeDarkTheme from 'monaco/vs-dark-plus-theme';
import { IOnigLib } from 'vscode-textmate';

const EditorPage = () => {
  const monaco = useMonaco();
  const onigLib = useLoadWASM();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!monaco || !onigLib || !containerRef.current) {
      return;
    }

    const language = 'python';
    const element = containerRef.current;

    const provider = new SimpleLanguageInfoProvider({
      grammars,
      fetchGrammar,
      configurations: languages.map((language) => language.id),
      fetchConfiguration,
      theme: VsCodeDarkTheme,
      onigLib,
      monaco,
    });

    registerLanguages(
      languages,
      (language: LanguageId) => provider.fetchLanguageInfo(language),
      monaco
    );

    const value = getSampleCodeForLanguage(language);

    monaco.editor.create(element, {
      value,
      language,
      theme: 'vs-dark',
      minimap: {
        enabled: true,
      },
    });
    provider.injectCSS();
  }, [monaco, onigLib, containerRef]);

  return <div ref={containerRef} />;
};

export default dynamic(() => Promise.resolve(EditorPage), { ssr: false });

interface DemoScopeNameInfo extends ScopeNameInfo {
  path: string;
}

const useLoadWASM = (): Promise<IOnigLib> | undefined => {
  const [lib, setLib] = useState<Promise<IOnigLib> | undefined>();

  useEffect(() => {
    loadVSCodeOnigurumWASM().then((data) => loadWASM(data));
    const onigLib = Promise.resolve({
      createOnigScanner,
      createOnigString,
    });
    setLib(onigLib);
  }, []);

  return lib;
};

const languages: monaco.languages.ILanguageExtensionPoint[] = [
  {
    id: 'python',
    extensions: [
      '.py',
      '.rpy',
      '.pyw',
      '.cpy',
      '.gyp',
      '.gypi',
      '.pyi',
      '.ipy',
      '.bzl',
      '.cconf',
      '.cinc',
      '.mcconf',
      '.sky',
      '.td',
      '.tw',
    ],
    aliases: ['Python', 'py'],
    filenames: ['Snakefile', 'BUILD', 'BUCK', 'TARGETS'],
    firstLine: '^#!\\s*/?.*\\bpython[0-9.-]*\\b',
  },
];

const grammars: { [scopeName: string]: DemoScopeNameInfo } = {
  'source.python': {
    language: 'python',
    path: 'MagicPython.tmLanguage.json',
  },
};

const fetchGrammar = async (scopeName: ScopeName): Promise<TextMateGrammar> => {
  const { path } = grammars[scopeName];
  const uri = `/grammars/${path}`;
  const response = await fetch(uri);
  const grammar = await response.text();
  const type = path.endsWith('.json') ? 'json' : 'plist';
  return { type, grammar };
};

const fetchConfiguration = async (
  language: LanguageId
): Promise<monaco.languages.LanguageConfiguration> => {
  const uri = `/configurations/${language}.json`;
  const response = await fetch(uri);
  const rawConfiguration = await response.text();
  return rehydrateRegexps(rawConfiguration);
};

// Taken from https://github.com/microsoft/vscode/blob/829230a5a83768a3494ebbc61144e7cde9105c73/src/vs/workbench/services/textMate/browser/textMateService.ts#L33-L40
export async function loadVSCodeOnigurumWASM(): Promise<
  Response | ArrayBuffer
> {
  const response = await fetch('/wasm/onig.wasm');
  const contentType = response.headers.get('content-type');
  if (contentType === 'application/wasm') {
    return response;
  }

  // Using the response directly only works if the server sets the MIME type 'application/wasm'.
  // Otherwise, a TypeError is thrown when using the streaming compiler.
  // We therefore use the non-streaming compiler :(.
  return await response.arrayBuffer();
}

function getSampleCodeForLanguage(language: LanguageId): string {
  const now = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
  if (language === 'python') {
    return `\
# ${now}
import foo
async def bar(): string:
  f = await foo()
  f_string = f"Hooray {f}! format strings are not supported in current Monarch grammar"
  return foo_string
`;
  }

  throw Error(`unsupported language: ${language}`);
}

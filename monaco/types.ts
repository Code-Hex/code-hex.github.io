import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export interface MonacoLanguageLoaderResult {
  language: monaco.languages.IMonarchLanguage;
  conf: monaco.languages.LanguageConfiguration;
}

export interface LanguageLoaderState {
  loaded?: MonacoLanguageLoaderResult;
  loading: boolean;
  error?: Error;
}

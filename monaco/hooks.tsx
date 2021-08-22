import { useMonaco } from '@monaco-editor/react';
import { useState } from 'react';
import { LanguageLoaderState, MonacoLanguageLoaderResult } from './types';

export const useLanguageLoader = (languageId: string): LanguageLoaderState => {
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

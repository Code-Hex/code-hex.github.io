import { useCallback, useRef } from 'react';

// https://github.com/facebook/react/issues/15176#issuecomment-512740882
export function useCallbackRef<T extends (...args: any[]) => any>(
  rawCallback: T,
) {
  const cleanupRef = useRef<T | null>(null);
  const callback = useCallback(
    (node: unknown) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback],
  );

  return callback;
}

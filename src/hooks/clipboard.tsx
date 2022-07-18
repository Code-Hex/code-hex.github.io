import Clipboard from "clipboard";
import { useCallback, useRef } from "react";
import { useCallbackRef } from "./callbackref";

type Props = {
  onCopied: () => void;
};

export const useClipboard = ({ onCopied }: Props) => {
  const targetRef = useRef(null);
  const callback = useCallback((element: Element | null) => {
    if (element === null) return;
    const cb = new Clipboard(element, {
      target: () => targetRef.current!,
    });
    cb.on("success", () => {
      onCopied();
    });
    return () => {
      cb.destroy();
    };
  }, [onCopied]);
  const monitorRef = useCallbackRef(callback);
  return { monitorRef, targetRef };
};

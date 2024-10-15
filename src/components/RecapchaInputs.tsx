import { FC, useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: () => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: 'invisible';
  callback: (token: string) => void;
}

interface Props {
  formID: string;
  children: (props: CaptchaProps) => any;
}

export interface CaptchaProps {
  isReady: boolean;
  execute: () => Promise<string>;
}

const RecapchaInputs: FC<Props> = (props: Props) => {
  const [isReady, setReady] = useState(false);
  const siteKey = '6Le-vr0UAAAAALh9uIQyL3xL2fAEzKpo4_DPgepD';

  useEffect(() => {
    const widget = document.createElement('div');
    const widgetID = 'g-recaptcha';
    widget.id = widgetID;
    document.body.appendChild(widget);

    // register onload function for recaptcha.
    window.captchaOnLoad = () => {
      window.grecaptcha.render(widgetID, {
        sitekey: siteKey,
        size: 'invisible',
        callback: (token) => {
          const form = document.getElementById(props.formID) as HTMLFormElement;
          if (form.reportValidity() === false) {
            return;
          }
          const hiddenInput = document.createElement('input');
          hiddenInput.hidden = true;
          hiddenInput.name = 'g-recaptcha-response';
          hiddenInput.value = token;
          form.appendChild(hiddenInput);
          form.submit();
        },
      });
      window.grecaptcha.ready(() => setReady(true));
    };

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=captchaOnLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(widget);
    };
  }, [props.formID]);

  return props.children({
    isReady: isReady,
    execute: () => {
      if (isReady === false) {
        throw new Error("captcha can be executed only when it's ready.");
      }
      return window.grecaptcha.execute();
    },
  });
};

export default RecapchaInputs;

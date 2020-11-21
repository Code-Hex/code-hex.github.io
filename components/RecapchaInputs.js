import { useEffect, useState } from 'react';

const RecapchaInputs = (props) => {
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
        callback: () => {
          const form = document.getElementById(props.formID);
          if (form.reportValidity() === false) {
            return;
          }
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
  }, []);

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

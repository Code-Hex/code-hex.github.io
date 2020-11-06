import React from 'react';

export default class RecapchaInputs extends React.Component {
  componentDidMount() {
    const siteKey = '6Le-vr0UAAAAALh9uIQyL3xL2fAEzKpo4_DPgepD';
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.addEventListener('load', () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, {
            action: 'validate_captcha',
          })
          .then((token) => {
            document.getElementById('g-recaptcha-response').value = token;
          });
      });
    });
    document.body.appendChild(script);
  }

  render() {
    return (
      <>
        <input
          type="hidden"
          id="g-recaptcha-response"
          name="g-recaptcha-response"
        />
        <input type="hidden" name="action" value="validate_captcha" />
      </>
    );
  }
}

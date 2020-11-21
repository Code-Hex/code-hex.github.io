import Head from 'next/head';
import RecaptureInputs from '../components/RecapchaInputs';
import CodeHex from '../components/CodeHex';

export default function SlackInvitation() {
  return (
    <div className="slack-invitation">
      <Head>
        <title>Join code-hex workspace on Slack!</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=no"
        ></meta>
        <link
          rel="shortcut icon"
          href="https://slack.global.ssl.fastly.net/272a/img/icons/favicon-32.png"
        />
      </Head>
      <div className="splash">
        <div className="logos">
          <div className="logo org">
            <CodeHex width="48px" height="48px" />
          </div>
          <div className="logo slack"></div>
        </div>
        <p>
          Join <b>code-hex</b> workspace on Slack.
        </p>
        <form
          id="invite-form"
          method="post"
          action="https://slack-invitation.codehex.now.sh/invite"
        >
          <input
            className="form-item"
            name="email"
            placeholder="you@yourdomain.com"
            type="email"
            required
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          />
          <RecaptureInputs formID="invite-form">
            {(captcha) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  captcha.execute();
                }}
                disabled={!captcha.isReady}
              >
                Get my Invite
              </button>
            )}
          </RecaptureInputs>
        </form>
        <p className="btm">
          or{' '}
          <a href="https://code-hex.slack.com" target="_top">
            sign in
          </a>{' '}
          or <a href="https://twitter.com/codehex">feedback</a>.
        </p>
        <p className="btm">
          Repository:{' '}
          <a href="https://github.com/Code-Hex/slack-invitation">
            https://github.com/Code-Hex/slack-invitation
          </a>
        </p>
      </div>
      <style jsx>{`
        .splash {
          width: 300px;
          margin: 200px auto;
          text-align: center;
          font-family: 'Helvetica Neue', Helvetica, Arial;
        }

        @media (max-width: 500px) {
          .splash {
            margin-top: 100px;
          }
        }

        .head {
          margin-bottom: 40px;
        }

        .logos {
          position: relative;
          margin-bottom: 40px;
        }

        .logo {
          width: 48px;
          height: 48px;
          display: inline-block;
          background-size: cover;
          margin-left: 0.3em;
        }

        .logo.slack {
          margin-left: 0.6em;
          background-image: url(assets/svg/slack.svg);
        }

        .logo.org::after {
          position: absolute;
          display: block;
          content: '+';
          top: 15px;
          left: 0;
          width: 300px;
          text-align: center;
          color: #d6d6d6;
          font: 15px Helvetica Neue;
        }

        p {
          font-size: 15px;
          margin: 5px 0;
        }

        select {
          background: none;
        }

        button,
        .form-item {
          font-size: 12px;
          margin-top: 10px;
          vertical-align: middle;
          display: block;
          text-align: center;
          box-sizing: border-box;
          width: 100%;
          padding: 9px;
        }

        button {
          color: #fff;
          font-weight: bold;
          border-width: 0;
          background: #e01563;
          text-transform: uppercase;
          cursor: pointer;
          appearence: none;
          -webkit-appearence: none;
          outline: 0;
          transition: background-color 150ms ease-in, color 150ms ease-in;
        }

        button.loading {
          pointer-events: none;
        }

        button:disabled {
          color: #9b9b9b;
          background-color: #d6d6d6;
          cursor: default;
          pointer-events: none;
        }

        button.error {
          background-color: #f4001e;
          text-transform: none;
        }

        button.success:disabled {
          color: #fff;
          background-color: #68c200;
        }

        button:not(.disabled):active {
          background-color: #7a002f;
        }

        b {
          transition: transform 150ms ease-in;
        }

        b.grow {
          transform: scale(1.3);
        }

        form {
          margin-top: 20px;
          margin-bottom: 0;
        }

        input {
          color: #9b9b9b;
          border: 1px solid #d6d6d6;
        }

        input:focus {
          color: #666;
          border-color: #999;
          outline: 0;
        }

        .active {
          color: #e01563;
        }

        p.btm {
          padding: 10px 0 10px;
          font-size: 11px;
        }

        p.btm a {
          color: #e01563;
          text-decoration: none;
        }

        p.btm a:hover {
          background-color: #e01563;
          color: #fff;
        }

        .logo.org {
          background-image: url(assets/svg/codehex.svg);
        }
      `}</style>
    </div>
  );
}

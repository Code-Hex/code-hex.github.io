import HomePageLayout from '../components/HomePageLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <HomePageLayout>
      <div className="marquee">
        <h1 className="title">Welcome to codehex's homepage</h1>
      </div>
      <img alt="codehex" src="/assets/svg/codehex.svg" />
      <p>My accounts</p>
      <ul>
        <li>
          <span>
            <a href="https://okinawa.pm.org/">Okinawa.pm</a>
          </span>
        </li>
        <li>
          <span>
            GitHub: <a href="https://github.com/Code-Hex/">Code-Hex</a>
          </span>
        </li>
        <li>
          <span>
            Twitter: <a href="https://twitter.com/codehex/">@codehex</a>
          </span>
        </li>
        <li>
          <span>
            Hatena: <a href="http://profile.hatena.ne.jp/codehex/">codehex</a>
          </span>
        </li>
        <li>
          <span>
            CPAN: <a href="https://metacpan.org/author/CODEHEX/">CODEHEX</a>
          </span>
        </li>
        <li>
          <span>
            Blog: <a href="https://codehex.hateblo.jp/">codehex.hateblo.jp</a>
          </span>
        </li>
      </ul>
      <p>Maps</p>
      <ul className="page-list">
        <li>
          <Link href="/unknown" as="/unknown">
            <a>My Unknown List</a>
          </Link>
        </li>
        <li>
          <a href="/wikipedia.html">Random Wikipedia</a>
        </li>
        <li>
          <Link href="/slack_invitation" as="/slack_invitation">
            <a>Join code-hex workspace on Slack!</a>
          </Link>
        </li>
        <li>
          <Link href="/stylish" as="/stylish">
            <a>My Stylish Page （工事中）</a>
          </Link>
        </li>
        <li>
          <a href="https://docs.google.com/spreadsheets/d/17_8cvRg7YFruqvayDgLY22aFZm_woGt7TkWbPlhopnQ/edit#gid=0">
            covid-19 沖縄の動向
          </a>
        </li>
      </ul>
      <style jsx>{`
        .page-list > li {
          padding: 4px 0;
        }

        .marquee {
          width: 400px;
          overflow: hidden;
          position: relative;
        }

        .marquee h1 {
          white-space: nowrap;
          padding-left: 600px;
          display: inline-block;
          animation: marquee 6s linear 0s infinite;
        }

        img:hover {
          animation: shake 0.5s linear 0s infinite;
        }

        @keyframes marquee {
          0% {
            transform: translate(0%);
          }
          100% {
            transform: translate(-100%);
          }
        }

        @keyframes shake {
          0% {
            transform: translate(1px, 1px) rotate(0deg);
          }
          10% {
            transform: translate(-1px, -2px) rotate(-1deg);
          }
          20% {
            transform: translate(-3px, 0px) rotate(1deg);
          }
          30% {
            transform: translate(3px, 2px) rotate(0deg);
          }
          40% {
            transform: translate(1px, -1px) rotate(1deg);
          }
          50% {
            transform: translate(-1px, 2px) rotate(-1deg);
          }
          60% {
            transform: translate(-3px, 1px) rotate(0deg);
          }
          70% {
            transform: translate(3px, 1px) rotate(-1deg);
          }
          80% {
            transform: translate(-1px, -1px) rotate(1deg);
          }
          90% {
            transform: translate(1px, 2px) rotate(0deg);
          }
          100% {
            transform: translate(1px, -2px) rotate(-1deg);
          }
        }
      `}</style>
    </HomePageLayout>
  );
}

import HomePageLayout from '~/layouts/HomePageLayout';
import CodeHex from '~/components/CodeHex';
import Link from '~/components/Link';

export default function Home() {
  return (
    <HomePageLayout>
      <div className="marquee">
        <h1 className="title py-4 text-3xl font-bold">
          Welcome to codehex&apos;s homepage
        </h1>
      </div>
      <div className="codehex-home">
        <CodeHex width="200px" height="200px" isShake={true} />
        <p className="py-2">My accounts</p>
        <ul className="list-disc pl-8">
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
        <p className="py-2">Maps</p>
        <ul className="page-list list-disc pl-8">
          {[
            {
              href: '/note',
              title: 'アルパカの徒然文',
            },
            {
              href: '/editor',
              title: 'アルパカの徒然文エディタ',
            },
            {
              href: '/unknown',
              title: 'My Unknown List',
            },
            {
              href: '/gcp_predefined_roles',
              title: 'GCP Predefined Roles Finder',
            },
            {
              href: '/slack_invitation',
              title: 'Join code-hex workspace on Slack!',
            },
            {
              href: '/stylish',
              title: 'My Stylish Page （工事中）',
            },
          ].map((v, i) => (
            <li key={i}>
              <Link href={v.href}>{v.title}</Link>
            </li>
          ))}
          <li>
            <a href="/wikipedia.html">Random Wikipedia</a>
          </li>
          <li>
            <a href="https://docs.google.com/spreadsheets/d/17_8cvRg7YFruqvayDgLY22aFZm_woGt7TkWbPlhopnQ/edit#gid=0">
              covid-19 沖縄の動向
            </a>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .page-list > li {
          padding: 4px 0;
        }

        .marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee h1 {
          white-space: nowrap;
          padding-left: 100%;
          display: inline-block;
          animation: marquee 6s linear 0s infinite;
        }

        .codehex-home {
          margin-left: 20px;
        }

        @keyframes marquee {
          0% {
            transform: translate(0%);
          }
          100% {
            transform: translate(-100%);
          }
        }
      `}</style>
    </HomePageLayout>
  );
}

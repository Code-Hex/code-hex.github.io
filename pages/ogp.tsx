import { useRouter } from 'next/router';
import Head from 'next/head';
import CodeHex from '~/components/CodeHex';

// Ref: https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site
// Example URL: http://localhost:3000/ogp/?title=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF%20mdx!!&url=https%3A%2F%2Fcodehex.dev%2Fhello-world&date=2021-10-10
const NoteOGP = () => {
  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const link = searchParams.get('url');

  if (!link) return null;

  const linkURL = new URL(link);
  const title = searchParams.get('title') ?? '';
  const date = searchParams.get('date') ?? '';

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP"
          rel="stylesheet"
        />
      </Head>
      {/* GitHub says any images should be at least 640×320px (1280×640px for best display). */}
      <div style={{ width: 1200, height: 640 }}>
        {/* GitHub recommends leaving a 40pt padding around important details of our social card to make sure nothing gets cropped */}
        <div
          className="flex flex-col justify-between text-gray-100 bg-gray-900"
          style={{ padding: '40pt' }}
        >
          <div className="space-y-2 overflow-hidden multiline-truncate">
            {date && (
              <p className="text-3xl font-semibold text-gray-600">
                <span>{date}</span>
              </p>
            )}
            <h1 className="text-7xl font-bold text-gray-100 font-noto-sans-jp leading-normal">
              {title}
            </h1>
          </div>
          <div className="flex justify-between items-center space-x-6">
            <div className="flex flex-col">
              <p className="mb-1 text-3xl font-semibold text-gray-200 font-noto-sans-jp">
                アルパカの徒然文
              </p>
              <p className="text-2xl font-semibold tracking-wide text-indigo-400">
                <span className="path">{linkURL.toString()}</span>
              </p>
            </div>
            <CodeHex width="120px" height="120px" isShake={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteOGP;

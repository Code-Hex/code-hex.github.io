import { createHash } from 'crypto';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import CodeHex from '~/components/CodeHex';
import puppeteer from 'puppeteer';

interface OgpComponentProps {
  date: string;
  title: string;
  path: string;
}

const defaultViewport = { width: 1280, height: 640 };

const OgpComponent = ({ date, title, path }: OgpComponentProps) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <style>{`
          .multiline-truncate {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </head>
      {/* GitHub says any images should be at least 640×320px (1280×640px for best display). */}

      <body style={defaultViewport}>
        {/* GitHub recommends leaving a 40pt padding around important details of our social card to make sure nothing gets cropped */}
        <div
          className="h-full flex flex-col justify-between text-gray-100 bg-gray-900"
          style={{ padding: '60pt 80pt 40pt 80pt' }}
        >
          <div className="space-y-2 overflow-hidden multiline-truncate">
            <p className="text-4xl font-semibold text-gray-400 font-source-sans-pro">
              <span>{date}</span>
            </p>
            <h1 className="text-7xl font-bold text-gray-100 leading-normal">
              {title}
            </h1>
          </div>
          <div className="flex justify-between items-center space-x-6">
            <div className="flex flex-col">
              <p className="mb-1 text-5xl font-semibold text-gray-200">
                アルパカの徒然文
              </p>
              <p className="text-3xl font-semibold tracking-wide text-indigo-400">
                <span className="path">https://codehex.dev{path}</span>
              </p>
            </div>
            <CodeHex width="150px" height="150px" isShake={false} />
          </div>
        </div>
      </body>
    </html>
  );
};

const getOgImage = async (date: string, title: string, path: string) => {
  const url = `/ogp/?title=${title}&url=${path}`;
  const hash = createHash('md5').update(url).digest('hex');
  const browser = await puppeteer.launch({
    defaultViewport,
    headless: true,
  });
  const ogImageDir = `./public/assets/images`;
  const imagePath = `${ogImageDir}/${hash}.webp`;
  const publicPath = `/assets/images/${hash}.webp`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exists, so we create it
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <OgpComponent date={date} title={title} path={path} />
  );

  const page = await browser.newPage();
  await page.setContent(html);
  const buffer = await page.screenshot({ type: 'webp' });
  await browser.close();

  if (!buffer) throw new Error('invalid screenshot result');

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
};

export default getOgImage;

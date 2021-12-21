import { ReactNode } from 'react';
import NextHeadSeo from 'next-head-seo';
import { useRouter } from 'next/router';

interface HomePageLayoutProps {
  title?: string;
  children?: ReactNode;
}

const HomePageLayout = ({ title, children }: HomePageLayoutProps) => {
  const router = useRouter();
  const siteTitle = 'codehex homepage';
  return (
    <div className="page">
      <NextHeadSeo
        title={title ? `${title} - ${siteTitle}` : siteTitle}
        description="codehex's homepage. There are links which are codehex has collected that I found interesting. In addition, information on each social networking site account."
        canonical={`https://codehex.dev${router.pathname}`}
        twitter={{
          site: '@codehex',
        }}
        og={{
          type: 'article',
        }}
        customMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
          {
            name: 'msapplication-TileColor',
            content: '#da532c',
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
        ]}
        customLinkTags={[
          {
            rel: 'icon',
            href: '/assets/favicon/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/assets/favicon/apple-touch-icon.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/assets/favicon/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/assets/favicon/favicon-16x16.png',
          },
          {
            rel: 'manifest',
            href: '/assets/favicon/site.webmanifest',
          },
        ]}
      />
      <main>
        <div className="page-main">{children}</div>
      </main>
      <style global jsx>{`
        html,
        body {
          background-color: #fff;
          color: #000;
          font-size: 18px;
        }

        a {
          text-decoration: none;
          color: #0652dd;
        }

        a:hover {
          text-decoration: underline;
        }

        * {
          box-sizing: border-box;
        }

        li a {
          line-height: 1.8;
        }

        @media (min-width: 60em) {
          li a {
            line-height: 1.2;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePageLayout;

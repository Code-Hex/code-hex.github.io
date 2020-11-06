import Head from 'next/head';

const HomePageLayout = (props) => {
  const { title, children } = props;
  const siteTitle = 'codehex homepage';
  return (
    <div className="page">
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="author" content="codehex"></meta>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <link rel="icon" href="/assets/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main>
        <div className="page-main">{children}</div>
      </main>
      <style global jsx>{`
        a {
          color: inherit;
          text-decoration: none;
          color: #4aa5f0;
        }

        a:hover {
          text-decoration: underline;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default HomePageLayout;

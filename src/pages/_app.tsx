import '../styles/globals.css';
import '../styles/mdx.css';
import type { AppProps } from 'next/app';
import { gaId, usePageView } from '~/lib/gtag';
import { GoogleAnalytics } from '~/components/GoogleAnalytics';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Script
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097329174824434"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

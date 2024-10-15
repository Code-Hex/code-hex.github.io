import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { gaId, usePageView } from '~/lib/gtag';
import { GoogleAnalytics } from '~/components/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

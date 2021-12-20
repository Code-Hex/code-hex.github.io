import '../styles/globals.css';
import '../styles/mdx.css';
import type { AppProps } from 'next/app';
import { usePageView } from '~/lib/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return <Component {...pageProps} />;
}

export default MyApp;

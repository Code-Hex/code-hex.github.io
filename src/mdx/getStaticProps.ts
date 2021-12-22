import getOgImage from '~/mdx/getOgImage';
import { Metadata } from './config';
import dayjs from 'dayjs';

export function makeGetStaticProps(meta: Metadata, path: string) {
  return async function getStaticProps() {
    const date = dayjs(meta.date).format('YYYY-MM-DD');
    const bookmarkCountResp = await fetch(`https://bookmark.hatenaapis.com/count/entry?url=https://codehex.dev${path}`)
    const bookmarkCount = await bookmarkCountResp.text()
    const ogpPath = await getOgImage(date, meta.title, path);
    return {
      props: {
        ogpPath,
        bookmarkCount,
      },
    };
  };
}

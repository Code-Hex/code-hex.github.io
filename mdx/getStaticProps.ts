import getOgImage from '~/mdx/getOgImage';
import { Metadata } from './config';
import dayjs from 'dayjs';

export function makeGetStaticProps(meta: Metadata, path: string) {
  return async function getStaticProps() {
    const date = dayjs(meta.date).format('YYYY-MM-DD');
    const ogpPath = await getOgImage(date, meta.title, path);
    return {
      props: {
        ogpPath,
      },
    };
  };
}

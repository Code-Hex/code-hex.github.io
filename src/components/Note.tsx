import { MDXProvider } from '@mdx-js/react';
import { Metadata } from '~/mdx/config';
import Link from '~/components/Link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, VFC } from 'react';
import Prism from 'prismjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tag } from './PreviewNote';
import NextHeadSeo from 'next-head-seo';
import { BlankLink } from './Link';

dayjs.extend(relativeTime);

interface NoteHeadProps {
  title?: string;
  description?: string;
  ogpPath?: string;
}

export const NoteHead: VFC<NoteHeadProps> = ({
  title,
  description,
  ogpPath,
}) => {
  const router = useRouter();
  return (
    <NextHeadSeo
      title={title ? `${title} – アルパカの徒然文` : 'アルパカの徒然文'}
      description={
        description ??
        'これ我が徒然文なり。わざを含めしゆかしき事柄につきて、率直なる感想を述ぶ。'
      }
      canonical={`https://codehex.dev${router.pathname}`}
      twitter={{
        card: 'summary_large_image',
        site: '@codehex',
      }}
      og={{
        image: `https://codehex.dev${ogpPath}`,
        type: 'article',
      }}
      customMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ]}
    />
  );
};

interface NoteProps {
  meta: Metadata;
  components?: Record<string, React.ReactNode>;
  children: ReactNode;

  // getStaticProps
  ogpPath: string;
  bookmarkCount: number;
}

const Note = (props: NoteProps) => {
  const { meta, components, children, ogpPath, bookmarkCount } = props;
  const title = meta.title;
  const description = meta.description;
  return (
    <>
      <NoteHead title={title} description={description} ogpPath={ogpPath} />
      <main className="w-full mx-auto max-w-3xl xl:max-w-5xl">
        <NoteContent
          meta={meta}
          components={components}
          bookmarkCount={bookmarkCount}
        >
          {children}
        </NoteContent>
      </main>
      <footer className="w-full mx-auto max-w-3xl xl:max-w-5xl">
        <div className="text-md font-medium leading-5 divide-y divide-gray-200">
          <div className="mx-8 sm:mx-10 md:mx-12 pb-24 lg:pb-16">
            <Link href="/note" className="text-teal-500 hover:text-teal-600">
              ← Back to the note
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export interface NoteContentProps {
  meta: Metadata;
  children: ReactNode;
  components?: Record<string, React.ReactNode>;
  bookmarkCount: number;
}

export const NoteContent = ({
  meta,
  components = {},
  bookmarkCount,
  children,
}: NoteContentProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const date = dayjs(meta.date);
  return (
    <div className="w-full bg-white antialiased">
      <div className="mx-8 sm:mx-10 md:mx-12 pt-10 pb-16">
        <div className="pb-2 border-b border-gray-200 mb-10">
          <h1 className="inline-block text-3xl font-bold text-gray-900 tracking-tight">
            {meta.title}
          </h1>
          <div className="text-sm sm:text-base whitespace-nowrap text-gray-500">
            <div className="sr-only">Published on</div>
            <time dateTime={meta.date}>
              {date.format('MMMM DD, YYYY')} ({date.fromNow()})
            </time>
          </div>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <article className="prose sm:prose-sm md:prose-md">
          <MDXProvider components={components}>{children}</MDXProvider>
        </article>
        <div role="share" className="flex space-x-2 mt-8">
          <HatenaBookmark count={bookmarkCount} />
          <Tweet title={meta.title} />
        </div>
      </div>
    </div>
  );
};

export const HatenaBookmark: VFC<{
  count: number;
}> = ({ count }) => {
  const { pathname } = useRouter();
  return (
    <BlankLink
      href={`https://b.hatena.ne.jp/entry/s/codehex.dev${pathname}`}
      className="w-16 max-h-6 rounded-sm border border-blue-400"
    >
      <div className="w-full flex justify-between items-center">
        <span className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-bold py-px px-1">
          B!
        </span>
        <span className="w-full text-center text-gray-600 text-sm hover:bg-blue-100 hover:bg-opacity-50">
          {count}
        </span>
      </div>
    </BlankLink>
  );
};

export const Tweet: VFC<{
  title: string;
}> = ({ title }) => {
  const { pathname } = useRouter();
  const url = `https://codehex.dev${pathname}`;
  const href = encodeURI(
    `https://twitter.com/intent/tweet?text=${title}&url=${url}`
  );
  return (
    <BlankLink
      href={href}
      className="flex items-center w-20 rounded-sm bg-blue-400 hover:bg-blue-500"
    >
      <div className="px-2 w-full flex justify-between items-center">
        <TwitterLogo />
        <span className="text-white text-xs font-bold py-px px-1">Tweet</span>
      </div>
    </BlankLink>
  );
};

// https://about.twitter.com/en/who-we-are/brand-toolkit
const TwitterLogo: VFC<{}> = () => (
  <svg
    version="1.1"
    id="Logo"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="w-4 h-4"
    viewBox="0 0 248 204"
    xmlSpace="preserve"
  >
    <g id="Logo_1_">
      <path
        id="white_background"
        fill="#fff"
        d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
      />
    </g>
  </svg>
);

export default Note;

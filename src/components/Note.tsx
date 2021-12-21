import { MDXProvider } from '@mdx-js/react';
import { Metadata } from '~/mdx/config';
import Link from '~/components/Link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Prism from 'prismjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Tag } from './PreviewNote';
import NextHeadSeo from 'next-head-seo';

dayjs.extend(relativeTime);

interface NoteProps {
  meta: Metadata;
  components?: Record<string, React.ReactNode>;
  children: ReactNode;

  // getStaticProps
  ogpPath: string;
}

const Note = (props: NoteProps) => {
  const { meta, components, children, ogpPath } = props;
  const router = useRouter();
  const title = meta.title;
  const description = meta.description;
  return (
    <>
      <NextHeadSeo
        title={`${title} – codehex note`}
        description={description}
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
      <main className="w-full mx-auto max-w-3xl xl:max-w-5xl">
        <NoteContent meta={meta} components={components}>
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
}

export const NoteContent = ({
  meta,
  components = {},
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
          <div className="flex space-x-2 py-2">
            {meta.tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <article className="prose sm:prose-sm md:prose-md">
          <MDXProvider components={components}>{children}</MDXProvider>
        </article>
      </div>
    </div>
  );
};

export default Note;

import { MDXProvider } from '@mdx-js/react';
import { Metadata } from 'mdx/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import Prism from 'prismjs';

interface NoteProps {
  meta: Metadata;
  children: ReactNode;

  // getStaticProps
  ogpPath: string;
}

const Note = (props: NoteProps) => {
  const { meta, children, ogpPath } = props;
  const router = useRouter();
  const title = meta.title;
  return (
    <>
      <Head>
        <title>{title} – codehex note</title>
        {/* <meta name="description" content={meta.description}></meta> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codehex" />
        <meta name="twitter:creator" content="@codehex" />
        <meta name="twitter:title" content={`${title} – codehex note`} />
        {/* <meta name="twitter:description" content={description} /> */}
        <meta
          name="twitter:image:src"
          content={`https://codehex.dev${ogpPath}`}
        />
        <meta
          property="og:url"
          content={`https://codehex.dev${router.pathname}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} – codehex note`} />
        {/* <meta property="og:description" content={description} /> */}
        <meta property="og:image" content={`https://codehex.dev${ogpPath}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NoteContent title={title}>{children}</NoteContent>
      </main>
      <footer className="min-w-0 flex-auto px-8 sm:px-10 xl:px-12 pt-10 pb-24 lg:pb-16">
        <div className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
          <div className="pt-8">
            <Link href="/note">
              <a className="text-teal-500 hover:text-teal-600">
                ← Back to the note
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export interface NoteContentProps {
  title: string;
  children: ReactNode;
}

export const NoteContent = ({ title, children }: NoteContentProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="w-full bg-white antialiased">
      <div className="mx-8 sm:mx-10 md:mx-12 pt-10 pb-24 lg:pb-16">
        <div className="pb-2 border-b border-gray-200 mb-10">
          <h1 className="inline-block text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
        <article className="prose sm:prose-sm md:prose-md">
          <MDXProvider components={{}}>{children}</MDXProvider>
        </article>
      </div>
    </div>
  );
};

export default Note;

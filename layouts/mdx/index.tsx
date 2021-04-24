import { MDXProvider } from '@mdx-js/react';
import React, { ReactNode } from 'react';
import { MDXComponents } from '~/components/Mdx';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface FrontMatter {
  title: string;
  date: string;
  tags: string[];
}

interface IndexProps {
  frontMatter: FrontMatter;
  children: ReactNode;
}

const Index = ({ children, frontMatter }: IndexProps) => {
  const { title } = frontMatter;
  const router = useRouter();
  return (
    <MDXProvider components={{ ...MDXComponents }}>
      <main>
        <article className="py-16">
          <Head>
            <title>{title} – codehex note</title>
            {/* <meta name="description" content={meta.description}></meta> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@codehex" />
            <meta name="twitter:creator" content="@codehex" />
            <meta name="twitter:title" content={`${title} – codehex note`} />
            {/* <meta name="twitter:description" content={description} /> */}
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:image"
              content={`https://codehex.dev/assets/images/twitter-card-small.jpg`}
            />
            <meta
              property="og:url"
              content={`https://codehex.dev${router.pathname}`}
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={`${title} – codehex note`} />
            {/* <meta property="og:description" content={description} /> */}
            <meta
              property="og:image"
              content={`https://codehex.dev/assets/images/twitter-card-small.jpg`}
            />
          </Head>
          <div className={`w-full flex bg-white antialiased`}>
            <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
              <div className="pb-10 border-b border-gray-200 mb-10">
                <div>
                  <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">
                    {title}
                  </h1>
                </div>
                <p className="mt-1 text-lg text-gray-500">Detail</p>
              </div>

              <div>{children}</div>
              <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
                <div className="pt-8">
                  <Link href="/note">
                    <a className="text-teal-500 hover:text-teal-600">
                      ← Back to the note
                    </a>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </main>
    </MDXProvider>
  );
};

export default Index;

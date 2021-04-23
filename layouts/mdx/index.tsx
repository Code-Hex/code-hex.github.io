import 'tailwindcss/tailwind.css';
import styles from './index.module.css';
import { MDXProvider } from '@mdx-js/react';
import React, { ReactNode } from 'react';
import { MDXComponents } from '~/components/Mdx';

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
  return (
    <MDXProvider components={{ ...MDXComponents }}>
      <div className={`${styles.footnotes} w-full flex bg-white antialiased`}>
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
        </div>
      </div>
    </MDXProvider>
  );
};

export default Index;

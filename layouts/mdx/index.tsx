import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import React, { ReactNode } from 'react';
import GitHubSlugger from 'github-slugger';

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
      <h1>{title}</h1>
      {children}
    </MDXProvider>
  );
};

export default Index;

const _ = new GitHubSlugger();

const MDXComponents: MDXProviderComponents = {};

import { ComponentType } from 'react';
import { importAll } from './utils';

interface Note {
  href: string;
  meta: {
    title: string;
    date: string;
    tags: string[];
  };
  default: ComponentType<any>;
}

export const getAllNotes = (): Note[] => {
  const imports = importAll(
    // @ts-ignore
    require.context('../pages/note/?preview', true, /\.mdx$/)
  );
  return imports.map((i: any) => ({
    href: `/note/${i.link}`,
    meta: i.module.meta,
    default: i.module.default,
  }));
};

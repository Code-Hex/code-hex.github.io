import path from 'path';

const dateSortDesc = (a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

const importAll = (r) => {
  return r
    .keys()
    .filter((fileName) => !fileName.includes('pages'))
    .map((fileName) => ({
      link: fileName.substr(2).replace(/\/index\.mdx$/, ''),
      module: r(fileName),
    }))
    .sort((a, b) => dateSortDesc(a.module.meta.date, b.module.meta.date));
};

export const getAllNotes = () => {
  return importAll(require.context('../pages/note/?preview', true, /\.mdx$/));
};

import { frontMatter as blogPages } from './note/*.mdx';
import NotePageListLayout from '../layouts/NotePageListLayout';

export default function DocsPage({ pages }) {
  return <NotePageListLayout title="Blog Posts" pages={pages} />;
}

export async function getStaticProps() {
  const pages = blogPages.sort((a, b) => new Date(b.date) - new Date(a.date));
  return {
    props: {
      pages,
    },
  };
}

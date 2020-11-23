import { frontMatter as blogPages } from '../*.mdx';
import NotePageListLayout from '../../../layouts/NotePageListLayout';
import { useRouter } from 'next/router';

export default function TagPage({ pages }) {
  const router = useRouter();
  const { tag } = router.query;
  return <NotePageListLayout title={'# ' + tag} pages={pages} />;
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const pages = blogPages.filter((doc) => doc.tags.includes(tag));
  return {
    props: {
      pages,
    },
  };
}

export async function getStaticPaths() {
  const docs = blogPages;
  const tags = docs
    .map((doc) => doc.tags)
    .flat(1)
    .filter((value, index, self) => self.indexOf(value) === index); // uniq
  const paths = tags.map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

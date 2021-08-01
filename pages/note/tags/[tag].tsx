// import NotePageListLayout from '../../../layouts/NotePageListLayout';
import { getAllNotes } from 'mdx/utils';
import { GetStaticProps } from 'next';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Page {
  title: string;
  date: string;
  tags: string[];
  href: string;
}

interface TagPageProps {
  pages: Page[];
}

const notes = getAllNotes();

export default function TagPage({ pages }: TagPageProps) {
  // return <NotePageListLayout title={'# ' + tag} pages={pages} />;
  return (
    <div className="flex flex-row">
      {pages.map((page, i) => {
        console.log(pages);
        return (
          <div key={i}>
            <div>
              <Link href={page.href}>
                <a className="text-blue-400 hover:text-blue-600 hover:underline">
                  {page.title}
                </a>
              </Link>
            </div>
            <div>date: {page.date}</div>
            <div>tags: {page.tags.join(', ')}</div>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag;
  const pages = notes
    .filter((note: any) => note.module.meta.tags.includes(tag))
    .map(
      (note: any): Page => {
        return {
          title: note.module.meta.title,
          tags: note.module.meta.tags,
          href: `/note/${note.link}`,
          date: dayjs(note.module.meta.date).format('YYYY-MM-DD'),
        };
      }
    );

  return {
    props: {
      pages,
    },
  };
};

export async function getStaticPaths() {
  const tags = notes
    .map((note: any) => note.module.meta.tags)
    .flat(1)
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    ); // uniq
  const paths = tags.map((tag: string) => {
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

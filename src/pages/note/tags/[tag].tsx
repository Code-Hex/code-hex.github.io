import { getAllNotes } from '~/mdx/notes';
import dayjs from 'dayjs';
import { PreviewItem, PreviewNote } from '~/components/PreviewNote';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { invariant } from 'ts-invariant';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { NoteItems } from '~/layouts/NoteItems';

const notes = getAllNotes();

interface TagPageProps {
  itemLinks: string[];
  tag: string;
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  invariant(
    params?.tag && typeof params?.tag === 'string',
    `unexpected tag value: ${params?.tag}`
  );

  const wantTag = params.tag;
  const itemLinks = notes
    .filter((note) => note.meta.tags.find((tag) => tag === wantTag))
    .map((note) => note.href);

  return {
    props: {
      itemLinks,
      tag: wantTag,
    },
  };
};

export async function getStaticPaths() {
  const tags = notes.map((note) => note.meta.tags).flat(1);
  // remove uniq items: https://stackoverflow.com/a/33121880
  const paths = [...new Set(tags)].map((tag: string) => {
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

export default function TagPage({
  itemLinks,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const items = notes
    .filter((note) => itemLinks.indexOf(note.href) >= 0)
    .map(
      (note): PreviewItem => {
        return {
          title: note.meta.title,
          tags: note.meta.tags,
          href: note.href,
          datetime: dayjs(note.meta.date).format('YYYY-MM-DD'),
          iconBackground: 'bg-green-400',
          Preview: note.default,
        };
      }
    );

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <NoteItems title={`# ${tag}`} items={items} Preview={PreviewNote}>
      <p className="mt-3 text-xl text-gray-500 sm:mt-4">
        <span className="text-pink-600">{items.length}</span> posts in{' '}
        <span className="font-bold text-black"># {tag}</span>
      </p>
    </NoteItems>
  );
}

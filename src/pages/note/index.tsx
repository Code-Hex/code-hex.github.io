import Link from 'next/link';
import { getAllNotes } from '~/mdx/notes';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { PreviewItem, PreviewNote } from '~/components/PreviewNote';
import { NoteItems } from '~/layouts/NoteItems';

export default function Index() {
  const notes = getAllNotes();
  const items = useMemo(
    () =>
      notes.map(
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
      ),
    [notes]
  );

  return (
    <NoteItems title="Notes" items={items} Preview={PreviewNote}>
      <p className="mt-3 text-xl text-gray-500 sm:mt-4">
        This is{' '}
        <Link href="/">
          <a className="text-blue-400 hover:text-blue-600 hover:underline">
            @codehex
          </a>
        </Link>
        &apos;s personal note. Candid thoughts any technical stacks and other
        interesting things.
      </p>
    </NoteItems>
  );
}

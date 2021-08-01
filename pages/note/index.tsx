import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import { GetStaticProps } from 'next';
import { getAllNotes } from 'mdx/utils';
import dayjs from 'dayjs';

interface Page {
  title: string;
  date: string;
  tags: string[];
  filename: string;
}
// pages variable:
// [
//     {
//         title: 'こんにちは mdx!!',
//         date: '2020-11-23T00:00:00.000Z',
//         tags: [ 'blog', 'tag1', 'tag2', 'perl' ],
//         filename: 'mdx-ftw'
//     }
// ]
const notes = getAllNotes();

export default function Index() {
  const title = 'Notes';
  const timelines: Timeline[] = notes.map((note: any) => {
    return {
      key: '/' + note.link,
      title: note.module.meta.title,
      tags: note.module.meta.tags,
      href: `/note/${note.link}`,
      datetime: dayjs(note.module.meta.date).format('YYYY-MM-DD'),
      iconBackground: 'bg-green-400',
    };
  });
  return (
    <div className="antialiased">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 py-10">
        <main className="divide-y divide-gray-200">
          <div className="text-left py-4">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              This is{' '}
              <Link href="/">
                <a className="text-blue-400 hover:text-blue-600 hover:underline">
                  @codehex
                </a>
              </Link>
              &apos;s personal note. Candid thoughts any technical stacks and
              other interesting things.
            </p>
          </div>
          <div className="max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            <TimelineComponent timeline={timelines} />
          </div>
        </main>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {
      pages: notes.map(
        (p: any): Page => {
          return {
            title: p.module.meta.title,
            date: dayjs(p.module.meta.date).format('YYYY-MM-DD'),
            tags: p.module.meta.tags,
            filename: p.link,
          };
        }
      ),
    },
  };
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Timeline {
  key: string;
  title: string;
  href: string;
  tags: string[];
  datetime: string;
  iconBackground: string;
}

interface TimelineComponentProps {
  timeline: Timeline[];
}
const TimelineComponent = ({ timeline }: TimelineComponentProps) => {
  return (
    <ul className="divide-y divide-gray-200">
      {timeline.map((event) => (
        <li key={event.key}>
          <div className="mb-4 pt-4">
            <div className="flex flex-col space-y-1">
              <div className="min-w-0 flex-1 pt-1.5 flex justify-between items-center">
                <Link href={event.href}>
                  <a>
                    <p className="text-xl font-semibold text-gray-900">
                      {event.title}
                    </p>
                  </a>
                </Link>

                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                  <time dateTime={event.datetime}>{event.datetime}</time>
                </div>
              </div>
              <div className="flex space-x-2">
                {event.tags.map((tag) => (
                  <TagComponent tag={tag} key={tag} />
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

interface TagComponentProps {
  tag: string;
}

const TagComponent = ({ tag }: TagComponentProps) => {
  return (
    <div>
      <a
        href={`/note/tags/${tag}`}
        className="inline-flex items-center rounded border border-gray-300 px-2 py-0.5 text-xs"
      >
        <span className="absolute flex-shrink-0 flex items-center justify-center">
          <span
            className={classNames('bg-indigo-500 h-1.5 w-1.5 rounded-full')}
            aria-hidden="true"
          />
        </span>
        <span className="ml-2.5 font-medium text-gray-900">{tag}</span>
      </a>
    </div>
  );
};

import { frontMatter as blogPages } from './note/*.mdx';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

/**
 *
 * @param {string} p
 */
const formatPath = (p: string): string => {
  return p.replace(/\.mdx?$/, '');
};

/**
 *
 * @param {string} d
 */
const formatDate = (d: string): string => {
  return d.slice(0, 10);
};

interface Page {
  title: string;
  date: string;
  tags: string[];
  __resourcePath: string;
}
// pages variable:
// [
//     {
//         title: 'こんにちは mdx!!',
//         date: '2020-11-23T00:00:00.000Z',
//         tags: [ 'blog', 'tag1', 'tag2', 'perl' ],
//         __resourcePath: 'blog/mdx-ftw.mdx'
//     }
// ]
interface DocsPageProps {
  pages: Page[];
}

export default function DocsPage({ pages }: DocsPageProps) {
  const title = 'Notes';
  const timelines: Timeline[] = pages.map((v) => {
    return {
      key: '/' + v.__resourcePath,
      title: v.title,
      tags: v.tags,
      href: '/' + formatPath(v.__resourcePath),
      datetime: formatDate(v.date),
      iconBackground: 'bg-green-400',
    };
  });
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            This is{' '}
            <Link href="/">
              <a className="text-blue-400">@codehex</a>
            </Link>
            's personal note. Candid thoughts any technical stacks and other
            interesting things.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <TimelineComponent timeline={timelines} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const pages = (blogPages as Page[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return {
    props: {
      pages,
    },
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/*
  {
    key: "uniq"
    title: 'Applied to',
    href: '#',
    tags: [ 'blog', 'tag1', 'tag2', 'perl' ],
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  }
*/

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
          <div className="mb-4 pt-2">
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
        href={`/tags/${tag}`}
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

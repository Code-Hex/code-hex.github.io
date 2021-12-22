import dayjs from 'dayjs';
import Link from '~/components/Link';
import { ComponentType } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface PreviewItem {
  title: string;
  href: string;
  tags: string[];
  datetime: string;
  iconBackground: string;
  Preview: ComponentType<any>;
}

export interface PreviewNoteProps {
  items: PreviewItem[];
}

export const PreviewNote = ({ items }: PreviewNoteProps) => {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item) => (
        <li key={item.href} className="py-4">
          <div className="mb-4 pt-4">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-1">
                <div className="pt-1.5 flex justify-between items-center">
                  <Link href={item.href}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {item.title}
                    </h2>
                  </Link>
                </div>
                <div className="text-sm sm:text-base whitespace-nowrap text-gray-500">
                  <div className="sr-only">Published on</div>
                  <time dateTime={item.datetime}>
                    {dayjs(item.datetime).format('MMMM DD, YYYY')} (
                    {dayjs(item.datetime).fromNow()})
                  </time>
                </div>
                <div className="flex space-x-2 py-2">
                  {item.tags.map((tag) => (
                    <Tag tag={tag} key={tag} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="prose sm:prose-sm md:prose-md">
                  <item.Preview />
                </div>
                <div className="flex text-base font-medium">
                  <Link
                    href={item.href}
                    className="text-teal-600 hover:text-teal-700"
                    ariaLabel={item.title}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <Link
      href={`/note/tags/${tag}`}
      className="w-max inline-flex rounded-sm bg-blue-100 hover:bg-blue-600 px-2 py-0.5 text-sm"
    >
      <span className="font-medium text-blue-700 hover:text-white">
        # {tag}
      </span>
    </Link>
  );
};

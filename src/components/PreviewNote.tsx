import dayjs from 'dayjs';
import Link from '~/components/Link';
import { ComponentType } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TagList, PublishedOn } from './Note';

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
                <PublishedOn datetime={item.datetime} />
                <TagList tags={item.tags} />
              </div>
              <div className="flex flex-col space-y-6">
                <div className="prose sm:prose-sm md:prose-md">
                  <item.Preview />
                </div>
                <div className="flex text-base font-medium">
                  <Link
                    href={item.href}
                    className="text-teal-600 hover:text-teal-700"
                    ariaLabel={`${item.title}の続きを読む`}
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

import { ReactNode } from 'react';
import { PreviewItem, PreviewNote } from '~/components/PreviewNote';
import { useEffect } from 'react';
import Prism from 'prismjs';
import { NonSSRAdSense } from '~/components/NonSSRAdSense';

export interface NoteItemsProps {
  title: string;
  items: PreviewItem[];
  children: ReactNode;
}

export const NoteItems = ({ title, items, children }: NoteItemsProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="w-full mx-auto antialiased max-w-3xl xl:max-w-5xl">
      <div className="mx-8 sm:mx-10 md:mx-12 py-10">
        <main role="main" className="divide-y divide-gray-200">
          <div className="py-4">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900">
              {title}
            </h1>
            {children}
          </div>
          <div aria-label="preview" className="mx-auto">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <NonSSRAdSense
                  adFormat="auto"
                  adClient="ca-pub-8097329174824434"
                  adSlot="5787443255"
                  style={{ display: 'block' }}
                  fullWidthResponsive
                />
              </li>
              {items.map((item) => (
                <li key={item.href} className="py-4">
                  <PreviewNote item={item} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  CheckIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import { useClipboard } from 'src/hooks/clipboard';
import { Listbox, RadioGroup, Tab } from '@headlessui/react';
import Link from 'next/link';
import NextHeadSeo from 'next-head-seo';
import { useRouter } from 'next/router';

export const ToolsLogo: FC<{ className: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    stroke="url(#grad1)"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="0%"
          style={{
            stopColor: '#9061f9',
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: '#e74694',
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 15H6l7-14v8h5l-7 14v-8Z"
    />
  </svg>
);

export const ToolsNavigationHeader: FC<{ mainTitle: string }> = ({
  mainTitle,
}) => {
  return (
    <nav className="bg-gray-800 text-sky-400">
      <div className="px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link
                className="flex items-center font-bold text-xl space-x-2"
                href="/tools/"
              >
                <ToolsLogo className="h-7 w-7" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-sky-400">
                  {mainTitle}
                </span>
              </Link>
            </div>
          </div>
          {/* <div className="hidden lg:block">Search</div> */}
        </div>
      </div>
    </nav>
  );
};

const ToolsPageTitle: FC<{ title: string; subTitle: string }> = ({
  title,
  subTitle,
}) => {
  return (
    <header className="relative mb-4">
      <div className="flex items-center">
        <h1 className="inline-block text-2xl sm:text-3xl font-bold tracking-tight text-slate-200">
          {title}
        </h1>
      </div>
      <h2 className="mt-2 text-lg text-slate-400">{subTitle}</h2>
    </header>
  );
};

export const ToolsTextArea: FC<{
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  readOnly?: boolean;
  height?: string;
  saveAs?: {
    filename: string;
    mime?: string;
  };
}> = ({ placeholder, onChange, value, readOnly, height = 'h-40', saveAs }) => {
  const [copyed, setCopied] = useState(false);
  const onCopied = useCallback(() => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, []);
  const { monitorRef, targetRef } = useClipboard({
    onCopied,
  });
  const save = useCallback(() => {
    const blob = new Blob([value ?? ''], {
      type: saveAs?.mime,
    });
    const a = document.createElement('a');
    const downloadUrl = URL.createObjectURL(blob);
    a.href = downloadUrl;
    a.download = saveAs?.filename ?? '';
    a.click();
    URL.revokeObjectURL(downloadUrl);
  }, [value, saveAs]);
  return (
    <div className="relative">
      {readOnly && (
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="flex items-center justify-end rounded-lg">
            <div className="bg-slate-900 bg-opacity-50 rounded-md">
              <button
                ref={monitorRef}
                className="bg-black bg-opacity-0 hover:bg-opacity-90 rounded-md px-2 py-2 text-xs font-medium"
              >
                <span>
                  {copyed ? (
                    <CheckIcon className="w-5 h-5 text-green-300" />
                  ) : (
                    <ClipboardCopyIcon className="w-5 h-5" />
                  )}
                </span>
              </button>
              {saveAs && (
                <button
                  onClick={save}
                  className="bg-black bg-opacity-0 hover:bg-opacity-90 hover:rounded-md px-2 py-2 text-xs font-medium"
                >
                  <span>
                    <DownloadIcon className="w-5 h-5" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <textarea
        ref={targetRef}
        className={[
          height,
          'flex p-2.5 w-full text-sm font-mono rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500',
        ].join(' ')}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
};

export const ToolsTextAreaPulseAnimation = () => (
  <div className="relative">
    <div className="animate-pulse flex">
      <div className="rounded-lg bg-gray-700 w-full h-[160px]" />
    </div>
  </div>
);

export const ToolsLabel: FC<{ label: string }> = ({ label }) => {
  return <label className="text-md font-semibold">{label}</label>;
};

export const ToolsContentLayout: FC<{
  title: string;
  subTitle: string;
  children: ReactNode;
}> = ({ title, subTitle, children }) => {
  const mainTitle = 'Serverless Tools';
  const router = useRouter();
  return (
    <>
      <NextHeadSeo
        title={title !== mainTitle ? `${title} - ${mainTitle}` : mainTitle}
        description={subTitle}
        canonical={`https://codehex.dev${router.pathname}`}
        twitter={{
          card: 'summary_large_image',
          site: '@codehex',
        }}
        og={{
          image: `https://codehex.dev/assets/images/serverless-tools-ogp.png`,
          type: 'website',
        }}
      />
      <div className="bg-gray-900 text-slate-200 flex flex-col">
        <ToolsNavigationHeader mainTitle={mainTitle} />
        <main className="flex-grow max-w-8xl mb-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
            <ToolsPageTitle title={title} subTitle={subTitle} />
            {children}
          </div>
        </main>
        <ToolsFooter mainTitle={mainTitle} />
      </div>
    </>
  );
};

const ToolsFooter: FC<{ mainTitle: string }> = ({ mainTitle }) => {
  const subTitle = 'Server-independent web tools powered by Web Standard APIs.';
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t border-slate-600 text-slate-300 mt-6">
      <div className="px-4 py-6 flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center font-bold text-xl space-x-2">
            <ToolsLogo className="h-7 w-7" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-sky-400">
              {mainTitle}
            </span>
          </div>
          <span className="text-sm">{subTitle}</span>
        </div>
        <div className="flex flex-row items-end space-x-2">
          <span className="text-sm">
            © {year} {mainTitle}
          </span>
          <Link href="/">
            <span className="underline cursor-[_pointer]">
              made by @codehex
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

interface TabCategory<T> {
  id: string;
  title: string;
  Content: FC<T>;
}

type ToolsTabProps<T> = {
  categories: TabCategory<T>[];
  children: ReactNode;
};

export const ToolsTabs = ({
  categories,
  children,
}: PropsWithChildren<ToolsTabProps<any>>) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-50/10">
        {categories.map((category) => (
          <Tab
            key={category.id}
            className={({ selected }) =>
              [
                'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-sky-400',
                'focus:outline-none focus:ring-2',
                selected
                  ? 'border border-sky-400'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ].join(' ')
            }
          >
            {category.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-8">
        {categories.map((category) => (
          <Tab.Panel key={`${category.id}-panel`}>{children}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

interface ToolsListItem {
  title: string;
}

export const ToolsList = <T extends ToolsListItem>({
  selected,
  setSelected,
  list,
}: PropsWithChildren<{
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  list: ReadonlyArray<T>;
}>) => {
  return (
    <div className="w-56">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-50 text-gray-900 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
            {list.map((item) => (
              <Listbox.Option
                key={item.title}
                value={item}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export interface ToolsRadioGroupItem {
  label: string;
  value: string;
}

export const ToolsRadioGroup = <T extends ToolsRadioGroupItem>({
  selected,
  setSelected,
  title,
  items,
}: PropsWithChildren<{
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  title: string;
  items: ReadonlyArray<T>;
}>) => {
  return (
    <RadioGroup
      className="flex flex-col space-y-2"
      value={selected}
      onChange={setSelected}
    >
      <RadioGroup.Label>{title}</RadioGroup.Label>
      <div className="flex space-x-1 rounded-xl bg-gray-50/10">
        {items.map((item) => (
          <RadioGroup.Option
            key={item.value}
            value={item}
            className={({ checked }) =>
              [
                'cursor-[_pointer]',
                'w-full justify-between flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold leading-5 text-sky-400',
                'focus:outline-none focus:ring-2',
                checked
                  ? 'border border-sky-400'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ].join(' ')
            }
          >
            {({ checked }) => (
              <>
                <span>{item.label}</span>
                {checked && (
                  <div className="shrink-0">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export const ToolsButton: FC<{
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <button
      className="w-full text-md leading-5 rounded-md ring-1 ring-slate-900/10 py-2 ring-slate-300 bg-gray-50/10 highlight-white/5 hover:bg-slate-700 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ToolsCard: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-4 bg-slate-800 rounded-md">{children}</div>
);

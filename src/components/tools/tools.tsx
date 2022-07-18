import {
  ChangeEventHandler,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { CheckIcon, ClipboardCopyIcon } from "@heroicons/react/solid";
import { useClipboard } from "src/hooks/clipboard";
import { Tab } from "@headlessui/react";
import Link from "next/link";

export const ToolsNavigationHeader: FC = () => {
  return (
    <nav className="bg-gray-800 text-sky-400">
      <div className="px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center font-bold text-xl">
              <Link href="/tools/">Serverless Tools</Link>
            </div>
          </div>
          {/* <div className="hidden lg:block">Search</div> */}
        </div>
      </div>
    </nav>
  );
};

const ToolsPageTitle: FC<{ title: string; subTitle: string }> = (
  { title, subTitle },
) => {
  return (
    <header className="relative">
      <div className="flex items-center">
        <h1 className="inline-block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight dark:text-slate-200">
          {title}
        </h1>
      </div>
      <h2 className="mt-2 text-lg text-slate-700 dark:text-slate-400">
        {subTitle}
      </h2>
    </header>
  );
};

export const ToolsTextArea: FC<
  {
    label: string;
    placeholder: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    value?: string;
    readOnly?: boolean;
  }
> = (
  { label, placeholder, onChange, value, readOnly },
) => {
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
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor="message"
        className="text-md font-semibold"
      >
        {label}
      </label>
      <div className="relative">
        {readOnly && (
          <div className="absolute inset-x-0 top-0 z-10 m-[2px]">
            <div className="bg-black bg-opacity-0 flex items-stretch justify-end rounded-lg">
              <button
                ref={monitorRef}
                className="bg-white bg-opacity-0 hover:bg-opacity-20 relative rounded-md px-2 py-2 text-xs font-medium"
              >
                <span>
                  {copyed
                    ? <CheckIcon className="w-5 h-5 text-green-300" />
                    : <ClipboardCopyIcon className="w-5 h-5" />}
                </span>
              </button>
            </div>
          </div>
        )}
        <textarea
          id="message"
          ref={targetRef}
          rows={4}
          className="p-2.5 pr-12 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export const ToolsContentLayout: FC<{
  title: string;
  subTitle: string;
  children: ReactNode;
}> = (
  { title, subTitle, children },
) => {
  return (
    <div className="bg-gray-900 text-slate-200 flex flex-col">
      <ToolsNavigationHeader />
      <main className="flex-grow max-w-8xl mb-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
          <ToolsPageTitle
            title={title}
            subTitle={subTitle}
          />
          {children}
        </div>
      </main>
      <ToolsFooter />
    </div>
  );
};

const ToolsFooter = () => {
  return (
    <footer className="bg-gray-800 text-sky-400 mt-6">
      <div className="px-4 py-6">
        <Link href="/">Web Tools are developed by @codehex</Link>
      </div>
    </footer>
  );
};

interface TabCategory<T extends any> {
  id: string;
  title: string;
  Content: FC<T>;
}

type ToolsTabProps<T extends any> = {
  categories: TabCategory<T>[];
  children: (_: TabCategory<T>) => ReactNode;
};

export const ToolsTabs = <T extends any>(
  { categories, children }: PropsWithChildren<ToolsTabProps<T>>,
) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-50/10">
        {categories.map((category) => (
          <Tab
            key={category.id}
            className={({ selected }) =>
              [
                "w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-sky-400",
                "focus:outline-none focus:ring-2",
                selected
                  ? "border border-sky-400"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
              ].join(" ")}
          >
            {category.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-8">
        {categories.map((category) => (
          <Tab.Panel key={`${category.id}-panel`}>
            {children(category)}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

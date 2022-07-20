import {
  ChangeEventHandler,
  Dispatch,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  CheckIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useClipboard } from "src/hooks/clipboard";
import { Listbox, RadioGroup, Tab } from "@headlessui/react";
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
    placeholder: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    value?: string;
    readOnly?: boolean;
    height?: string;
    saveAs?: {
      filename: string;
      mime?: string;
    };
  }
> = (
  { placeholder, onChange, value, readOnly, height = "h-40", saveAs },
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
  const save = useCallback(() => {
    const blob = new Blob([value ?? ""], {
      type: saveAs?.mime,
    });
    const a = document.createElement("a");
    const downloadUrl = URL.createObjectURL(blob);
    a.href = downloadUrl;
    a.download = saveAs?.filename ?? "";
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
                  {copyed
                    ? <CheckIcon className="w-5 h-5 text-green-300" />
                    : <ClipboardCopyIcon className="w-5 h-5" />}
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
          "flex p-2.5 w-full text-sm font-mono rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",
        ].join(" ")}
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
  return (
    <label className="text-md font-semibold">
      {label}
    </label>
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

interface TabCategory<T> {
  id: string;
  title: string;
  Content: FC<T>;
}

type ToolsTabProps<T> = {
  categories: TabCategory<T>[];
  children: (_: TabCategory<T>) => ReactNode;
};

export const ToolsTabs = (
  { categories, children }: PropsWithChildren<ToolsTabProps<any>>,
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
                    active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                  }`}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.title}
                    </span>
                    {selected
                      ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )
                      : null}
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
                "cursor-[_pointer]",
                "w-full justify-between flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold leading-5 text-sky-400",
                "focus:outline-none focus:ring-2",
                checked
                  ? "border border-sky-400"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
              ].join(" ")}
          >
            {({ checked }) => (
              <>
                <span>
                  {item.label}
                </span>
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

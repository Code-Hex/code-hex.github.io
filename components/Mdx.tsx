import { MDXProviderComponents } from '@mdx-js/react';

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const MDXComponents: MDXProviderComponents = {
  h1: ({ className, ...props }) => (
    <h1
      {...props}
      className={classNames(
        className,
        `flex items-center my-4 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl`
      )}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      {...props}
      className={classNames(
        className,
        `flex items-center my-4 text-2xl leading-8 font-bold tracking-tight`
      )}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      {...props}
      className={classNames(
        className,
        `flex items-center my-2 text-xl leading-8 font-semibold tracking-tight`
      )}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      {...props}
      className={classNames(
        className,
        `flex items-center my-2 text-lg leading-8 font-medium tracking-tight`
      )}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      {...props}
      className={classNames(
        className,
        `text-blue-700 hover:text-blue-500 leading-relaxed hover:underline`
      )}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      {...props}
      className={classNames(className, `text-gray-700 leading-relaxed my-2`)}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      {...props}
      className={classNames(className, `text-black font-semibold`)}
    />
  ),
  inlineCode: ({ className, children, ...props }) => (
    <code {...props} className={classNames(className, `text-pink-600`)}>
      `{children}`
    </code>
  ),
  code: ({ className, ...props }) => (
    <code
      {...props}
      className={classNames(
        className,
        `w-full text-gray-200 inline-block p-4 scrolling-touch subpixel-antialiased`
      )}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={classNames(
        className,
        `block bg-gray-800 rounded-md scrollbar-none m-0 p-0 overflow-auto text-white text-sm leading-normal`
      )}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={classNames(className, `list-disc pl-4`)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={classNames(className, `list-decimal pl-4`)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={classNames(className, `text-gray-700 my-1`)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={classNames(
        className,
        `my-2 border-l-4 border-grey-light pl-4 italic`
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => {
    return (
      <div className="overflow-x-auto">
        <table
          className={classNames(className, `text-left mt-4 w-full`)}
          {...props}
        />
      </div>
    );
  },
  th: ({ className, ...props }) => (
    <th
      className={classNames(className, `font-semibold p-2 text-sm`)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={classNames(
        className,
        `p-2 border-t-2 text-sm whitespace-normal`
      )}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em {...props} className={classNames(className, 'italic')} />
  ),
};

import { SelectorIcon } from '@heroicons/react/solid';
import { InferGetStaticPropsType, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  FC,
} from 'react';
import Fuse from 'fuse.js';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

interface GCPRoles {
  [roleName: string]: GCPRole;
}

type GCPRole = {
  [locale: string]: {
    roleTitle: string;
    roleName: string;
    roleDescription: string;
  };
} & {
  permissions: string[];
};

type useSearchTuple<T> = [
  ReadonlyArray<T>,
  boolean,
  Dispatch<SetStateAction<string>>,
];

function useSearch<T>(
  list: ReadonlyArray<T>,
  options: Fuse.IFuseOptions<T>,
  debounce = 1000,
): useSearchTuple<T> {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(list);
  const [query, setQuery] = useState('');
  const fuseList = useMemo(() => new Fuse(list, options), [list, options]);

  useEffect(() => {
    if (query === '') {
      setLoading(false);
      setResult(list);
      return;
    }
    setLoading(true);
    const compileWithDelay = setTimeout(() => {
      const result = fuseList.search(query);
      setLoading(false);
      setResult(result.map((v) => v.item));
    }, debounce);
    return () => clearTimeout(compileWithDelay);
  }, [query, fuseList, list, debounce]);

  return [result, loading, setQuery];
}

const Loading = () => (
  <svg
    className="animate-spin h-10 w-10 text-indigo-500 mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps = async (_: GetStaticPropsContext) => {
  const url =
    'https://gist.githubusercontent.com/Code-Hex/b653ac81786e7117a63b2f13f1f11035/raw/0a33d60c4596b56cd52a27733a4f82645346584a/roles.json';
  const response = await fetch(url);
  const rawPayload = await response.text();
  return {
    props: {
      jsonPayload: JSON.parse(rawPayload) as GCPRoles,
    },
  };
};

type locale = 'en' | 'ja';

const locales: { [lang: string]: locale } = {
  English: 'en',
  日本語: 'ja',
};

const appName = 'GCP Predefined Roles Finder';
const title = `${appName} - codehex.dev`;
const description = `You can look for Predefined Roles in GCP. Search in any language you enter - ${appName} - codehex.dev`;

const GCPRolesPage: NextPage<Props> = ({ jsonPayload }) => {
  const [currentLocale, setCurrentLocale] = useState<locale>('en');
  const roles = useMemo(() => Object.values(jsonPayload), [jsonPayload]);
  const options = useMemo(
    (): Fuse.IFuseOptions<any> => ({
      keys: [
        'permissions',
        'en.roleTitle',
        'en.roleName',
        'ja.roleTitle',
        'ja.roleName',
      ],
      threshold: 0.2,
    }),
    [],
  );
  const [result, loading, setQuery] = useSearch(roles, options);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="dns-prefetch" href="https://cloud.google.com" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content="codehex.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:url"
          content="https://codehex.dev/gcp_predefined_roles/"
        />
        <meta property="og:description" content={description} />
      </Head>
      <div className="w-full h-full bg-gray-300">
        <div className="pb-4">
          <Filter
            setQuery={setQuery}
            currentLocale={currentLocale}
            setCurrentLocale={setCurrentLocale}
            resultNum={result.length}
          />
          <div className="py-4">
            <div className="w-full bg-white overflow-x-scroll h-screen">
              <GCPRoles
                result={result}
                loading={loading}
                locale={currentLocale}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GCPRolesPage;

const Filter: FC<{
  setQuery: Dispatch<SetStateAction<string>>;
  currentLocale: locale;
  setCurrentLocale: Dispatch<SetStateAction<locale>>;
  resultNum: number;
}> = ({ setQuery, currentLocale, setCurrentLocale, resultNum }) => {
  return (
    <div className="w-full bg-white flex flex-col sm:flex-row">
      <div className="flex flex-row items-center flex-shrink-0 justify-between">
        <FilterTitle />
        <FilterSelect
          currentLocale={currentLocale}
          setCurrentLocale={setCurrentLocale}
        />
      </div>
      <div className="w-full flex flex-row items-center">
        <input
          className="w-full py-4 px-4 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
          role="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="px-2 whitespace-nowrap flex flex-row space-x-2">
          <span className="text-pink-600">{resultNum}</span>
          <span className="text-gray-600">results</span>
        </div>
      </div>
    </div>
  );
};

const FilterTitle = () => (
  <a
    className="pl-4 py-4 hover:underline col-span-3 sm:col-span-1"
    href="https://cloud.google.com/iam/docs/understanding-roles#predefined_roles"
  >
    <span className="flex flex-row space-x-2 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="GCP Logo"
        className="h-6"
        src="https://lh3.googleusercontent.com/VEnnK2SyklusfxZ3dIYjlQH3xSwK2BFSJ69TFQ9g8HjM6m3CouRlTia5FW3z3GS0x83WC9TylZCaA9Jf_2kmr7mXxI9_HYLZTFy_bg"
      />
      <h1 className="whitespace-nowrap text-blue-600 font-bold">{appName}</h1>
    </span>
  </a>
);

const FilterSelect: FC<{
  currentLocale: locale;
  setCurrentLocale: Dispatch<SetStateAction<locale>>;
}> = ({ currentLocale, setCurrentLocale }) => (
  <div className="relative bg-transparent text-gray-700">
    <select
      className="appearance-none pl-4 pr-8 block focus:outline-none"
      onChange={(e) => setCurrentLocale(e.currentTarget.value as locale)}
      defaultValue={currentLocale}
    >
      {Object.keys(locales).map((lang, i) => (
        <option key={i} value={locales[lang]}>
          {lang}
        </option>
      ))}
    </select>
    <SelectorIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-0 -mt-2.5 pointer-events-none" />
  </div>
);

interface GCPRolesProps {
  result: ReadonlyArray<GCPRole>;
  loading: boolean;
  locale: locale;
}

const GCPRoles = ({ result, loading, locale }: GCPRolesProps): JSX.Element => {
  if (loading) {
    return (
      <div className="py-8">
        <Loading />
      </div>
    );
  }

  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr className="text-left text-gray-500">
          <th className="px-4 py-4">Role</th>
          <th className="px-4 py-4">Permissions</th>
        </tr>
      </thead>
      <tbody>
        {result.map((role, i) => (
          <GCPRoleRow key={i} role={role} locale={locale} />
        ))}
      </tbody>
    </table>
  );
};

// eslint-disable-next-line react/display-name
const GCPRoleRow = memo(
  ({ role, locale }: { role: GCPRole; locale: locale }): JSX.Element => {
    const { permissions, ...localeItems } = role;
    const localeItem = localeItems[locale];
    // To prevent null exception. for example there is in English but not in Japanese.
    if (!localeItem) return <></>;
    return (
      <tr className="border-b border-gray-300">
        <td className="px-4 align-top">
          <div className="sticky top-14 py-4">
            <p className="font-bold">{localeItem.roleTitle}</p>
            <p className="text-pink-600 font-mono">{localeItem.roleName}</p>
            <p className="py-2">{localeItem.roleDescription}</p>
          </div>
        </td>
        <td className="px-4 py-4">
          <GCPRolePermissions permissions={permissions} />
        </td>
      </tr>
    );
  },
);

// eslint-disable-next-line react/display-name
const GCPRolePermissions = memo(
  ({ permissions }: { permissions: string[] }): JSX.Element => {
    return (
      <ul>
        {permissions.map((permission, i) => {
          return <li key={i}>{permission}</li>;
        })}
      </ul>
    );
  },
);

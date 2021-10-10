import { InferGetStaticPropsType, GetStaticPropsContext, NextPage } from 'next';
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

async function filteringHandler<T>(
  list: T[],
  predicate: (item: T, query: string) => boolean,
  query: string
): Promise<T[]> {
  if (query === '') {
    return list;
  }
  return list.filter((item) => predicate(item, query));
}

type useSearchTuple<T> = [T[], boolean, Dispatch<SetStateAction<string>>];

function useSearch<T>(
  list: T[],
  predicate: (item: T, query: string) => boolean,
  debounce: number = 1000
): useSearchTuple<T> {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(list);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const compileWithDelay = setTimeout(() => {
      (async () => {
        const result = await filteringHandler(list, predicate, query);
        setLoading(false);
        setResult(result);
      })();
    }, debounce);
    return () => clearTimeout(compileWithDelay);
  }, [query, predicate, setLoading, setResult]);

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

export const getStaticProps = async (_: GetStaticPropsContext) => {
  const url =
    'https://gist.githubusercontent.com/Code-Hex/b653ac81786e7117a63b2f13f1f11035/raw/b11e92635efc78843f23066146450b7ea91b0197/roles.json';
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

const GCPRolesPage: NextPage<Props> = ({ jsonPayload }) => {
  const [currentLocale, setCurrentLocale] = useState<locale>('en');
  const predicate = useCallback((item: GCPRole, query: string): boolean => {
    const { permissions, ...localeItems } = item;

    const localeItemFounds = Object.values(localeItems).find((localeItem) => {
      if (localeItem.roleTitle.includes(query)) {
        return true;
      }
      if (localeItem.roleName.includes(query)) {
        return true;
      }
      return false;
    });
    return !!localeItemFounds;
  }, []);

  const roles = useMemo(() => Object.values(jsonPayload), [jsonPayload]);

  const [result, loading, setQuery] = useSearch(roles, predicate);

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="pb-4 sm:px-8">
        <div className="sticky top-0 shadow-xl">
          <div className="w-full bg-white flex flex-col sm:flex-row">
            <a
              className="pl-4 py-4 hover:underline col-span-3 sm:col-span-1"
              href="https://cloud.google.com/iam/docs/understanding-roles#predefined_roles"
            >
              <span className="flex flex-row space-x-2 items-center">
                <img
                  className="h-6"
                  src="https://lh3.googleusercontent.com/VEnnK2SyklusfxZ3dIYjlQH3xSwK2BFSJ69TFQ9g8HjM6m3CouRlTia5FW3z3GS0x83WC9TylZCaA9Jf_2kmr7mXxI9_HYLZTFy_bg"
                />
                <span className="flex-shrink-0 text-blue-600 font-bold w-60">
                  Predifined Roles Finder
                </span>
              </span>
            </a>
            <div className="w-full flex flex-row">
              <select
                className="px-2 bg-white focus:outline-none"
                onChange={(e) =>
                  setCurrentLocale(e.currentTarget.value as locale)
                }
              >
                {Object.keys(locales).map((lang, i) => (
                  <option key={i} value={locales[lang]}>
                    {lang}
                  </option>
                ))}
              </select>
              <input
                className="py-4 px-4 text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                placeholder="Search"
                role="search"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="w-full bg-white overflow-x-scroll">
            <GCPRoles
              result={result}
              loading={loading}
              locale={currentLocale}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCPRolesPage;

interface GCPRolesProps {
  result: GCPRole[];
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
      <thead className="bg-gray-100">
        <tr className="text-left text-gray-700">
          <th className="px-4 py-4">ロール</th>
          <th className="px-4 py-4">権限</th>
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

const GCPRoleRow = memo(
  ({ role, locale }: { role: GCPRole; locale: locale }): JSX.Element => {
    const { permissions, ...localeItems } = role;
    const localeItem = localeItems[locale];
    // To prevent null exception. for example there is in English but not in Japanese.
    if (!localeItem) return <></>;
    return (
      <tr className="border-b border-gray-300">
        <td className="px-4 py-4 align-top">
          <p className="font-bold">{localeItem.roleTitle}</p>
          <p className="text-pink-600 font-mono">{localeItem.roleName}</p>
          <p className="py-2">{localeItem.roleDescription}</p>
        </td>
        <td className="px-4 py-4">
          <GCPRolePermissions permissions={permissions} />
        </td>
      </tr>
    );
  }
);

const GCPRolePermissions = memo(
  ({ permissions }: { permissions: string[] }): JSX.Element => {
    return (
      <ul>
        {permissions.map((permission, i) => {
          return <li key={i}>{permission}</li>;
        })}
      </ul>
    );
  }
);

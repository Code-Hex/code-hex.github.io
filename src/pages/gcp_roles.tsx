import { InferGetStaticPropsType, GetStaticPropsContext, NextPage } from 'next';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';

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

type useSearchTuple<T> = [T[], boolean, Dispatch<SetStateAction<string>>];

function useSearch<T>(
  list: T[],
  predicate: (item: T, query: string) => boolean,
  debounce: number = 400
): useSearchTuple<T> {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(list);
  const [query, setQuery] = useState('');
  const [handleQuery] = useDebounce(query, debounce);

  const filteringHandler = useCallback(async (): Promise<T[]> => {
    if (handleQuery === '') {
      return [];
    }
    return list.filter((item) => predicate(item, handleQuery));
  }, [handleQuery, list, predicate]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const filtered = await filteringHandler();
      setLoading(false);
      setResult(filtered);
    })();
  }, [setResult, setLoading]);

  return [result, true, setQuery];
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
      stroke-width="4"
    ></circle>
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

const GCPRolesPage: NextPage<Props> = ({ jsonPayload }) => {
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

    if (localeItemFounds) {
      return true;
    }

    return !!permissions.find((permission) => permission.includes(query));
  }, []);

  const [result, loading, setQuery] = useSearch(
    Object.values(jsonPayload),
    predicate
  );

  return (
    <div className="w-full h-full bg-gray-300">
      <div className="py-4 px-8">
        <input
          className="w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
          role="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="py-4">
          <div className="w-full bg-white p-8">
            <GCPRoles result={result} loading={loading} />
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
}

const GCPRoles = ({ result, loading }: GCPRolesProps): JSX.Element => {
  if (loading) {
    return (
      <div className="px-8">
        <div className="bg-white p-8 overflow-x-auto">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ロール</th>
          <th>権限</th>
        </tr>
      </thead>
      <tbody>
        {result.map((role, i) => {
          const { permissions, ...localeItems } = role;
          const locale = localeItems['en'];
          return (
            <tr key={i}>
              <td>
                <p>
                  <strong>{locale.roleTitle}</strong>
                </p>
                <p>{locale.roleName}</p>
                <p>{locale.roleDescription}</p>
              </td>
              <td>
                <ul>
                  {permissions.map((permission, j) => {
                    return <li key={j}>{permission}</li>;
                  })}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

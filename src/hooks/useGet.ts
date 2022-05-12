import { useCallback, useEffect, useState } from 'react';

type UseGetArgs = {
  query: string;
  skip?: boolean;
};

export const useGet = <T extends any>({ query, skip }: UseGetArgs) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setData(await response.json());
  }, [query]);

  useEffect(() => {
    try {
      if (skip !== true) {
        getData();
      }
    } catch (e) {
      console.error(e);
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [query, skip]);

  return {
    data,
    isLoading,
    error,
    refetchData: getData,
  };
};

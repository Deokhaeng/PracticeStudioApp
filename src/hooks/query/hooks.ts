import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetApiFunc, PaginatedCallable } from './types';
import { AxiosError } from 'axios';
import { Integerable, ResourceType } from '~types/apiTypes';

export const usePagination = <T>({ callableFC, search, apiKey }: { callableFC: PaginatedCallable<T>; search?: string; apiKey?: ResourceType }) => {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, ...query } = useInfiniteQuery([apiKey], async ({ pageParam }) => (await callableFC({ nextPage: pageParam ?? 1, search })).data, {
    retry: 0,
    onSuccess: (res) => {},
    getNextPageParam: (page) => page.next_page,
    onError: (error: AxiosError) => {
      console.log(error.message);
      const errorRes = error.response?.data as { message: Object };
      console.log(`usePagination_error: ${apiKey} status: ${error.response?.status} message: ${errorRes}`);
    },
  });
  const invalidate = () => {
    queryClient.invalidateQueries([apiKey]);
  };

  const fetchList = () => {
    return new Promise<boolean>((resolve, reject) => {
      if (query.status === 'loading') return resolve(false);
      if (query.hasNextPage) {
        return fetchNextPage().then(() => resolve(true));
      }
      return resolve(false);
    });
  };

  const _data = !data ? [] : data.pages.map((page) => page?.results).reduce((prev, cur) => [...prev, ...cur]);

  return {
    queryClient,
    status: query.status,
    data: _data,
    invalidate: queryClient.invalidateQueries([apiKey]),
    fetchList: fetchList,
    filteredSearch: fetchList,
    hasNext: query.hasNextPage,
  };
};

export const useGetQuery = <T, U>(api: GetApiFunc<T, U>, apiKeys: [ResourceType, Integerable] | [ResourceType], variables?: U & Integerable, filter?: U) => {
  const queryClient = useQueryClient();

  const query = useQuery([apiKeys], async (): Promise<T> => (await api(variables, filter)).data, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1,
    onError: (error: AxiosError) => {
      `useGetQuery: ${apiKeys} status: ${error.status} message: ${error.response?.data}`;
    },
    onSuccess: (_data) => {
      // queryClient.invalidateQueries(apiKeys);
    },
    enabled: !!variables,
  });

  return { ...query, data: query.data };
};

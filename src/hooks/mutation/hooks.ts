import { GetApiFunc } from '@hooks/query';
import { DeleteAPIFunc, PatchAPIFunc, PostAPIFunc } from './types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Integerable, ResourceType } from '~types/apiTypes';
import { errorResponse } from '@utils/index';

export const useGetMutation = <T, U>(api: GetApiFunc<T, U>, apiKeys: [ResourceType, Integerable] | [ResourceType], variables?: U & Integerable) => {
  const { mutateAsync, status, data } = useMutation([apiKeys], async (): Promise<T> => (await api(variables)).data, {
    retry: 0,
    onError: (error: AxiosError) => {
      const { message, errorStatus } = errorResponse(error);
      console.log(`useGetMutation_error: ${apiKeys} status: ${errorStatus} message: ${message}`);
    },
    onSuccess: (_data) => {
      // queryClient.invalidateQueries(apiKeys);
    },
  });

  return { mutateAsync, state: status, data };
};

export const usePostMutation = <L, T extends L | L[], V extends {} = {}>(api: PostAPIFunc<T, V>, apiKeys: [ResourceType, Integerable] | [ResourceType]) => {
  const query = useQueryClient();
  const { mutateAsync, status, data } = useMutation([apiKeys], ({ variables }: { variables?: V }) => api(variables!), {
    onSuccess() {
      query.invalidateQueries(apiKeys);
    },
    onError(error: AxiosError) {
      const { message, errorStatus } = errorResponse(error);
      console.log(`usePostMutation_error: ${apiKeys} status: ${errorStatus} message: ${message}`);
    },
  });
  return { mutateAsync, state: status, data: data?.data };
};

export const usePatchMutation = <T, U extends Partial<T & any>>(api: PatchAPIFunc<T, U>, apiKeys: [ResourceType, Integerable] | [ResourceType]) => {
  const query = useQueryClient();
  const { mutateAsync, status, data } = useMutation([apiKeys], (variables: U) => api(variables), {
    onSuccess() {
      query.invalidateQueries(apiKeys);
    },
    onError(error: AxiosError) {
      const { message, errorStatus } = errorResponse(error);
      console.log(`usePatchMutation_error: ${apiKeys} status: ${errorStatus} message: ${message}`);
    },
  });
  return { mutateAsync, state: status, data: data?.data };
};

export const useDeleteMutation = (api: DeleteAPIFunc, apiKeys: [ResourceType, Integerable] | [ResourceType]) => {
  const query = useQueryClient();
  const { mutateAsync, status } = useMutation(apiKeys, (id: Integerable) => api(id), {
    onSuccess() {
      query.invalidateQueries(apiKeys);
    },
    onError(error: AxiosError) {
      const { message, errorStatus } = errorResponse(error);
      console.log(`useDeleteMutation_error: ${apiKeys} status: ${errorStatus} message: ${message}`);
    },
  });

  return { mutateAsync, state: status };
};

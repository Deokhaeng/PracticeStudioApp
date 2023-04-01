import { AxiosError, AxiosResponse } from 'axios';

type Integerable = number | string;

export type onFullfilledFunc<T> = {
  onSuccess?: (success: AxiosResponse<T>) => void;
  onFailure?: (error: AxiosError) => void;
};

export type PostAPIFunc<Data = unknown, Variables = unknown> = (variables: Variables) => Promise<AxiosResponse<Data>>;

export type GenericCallable<T> = (param?: object) => Promise<AxiosResponse<T>>;

export type PatchAPIFunc<Data = unknown, Variables = unknown> = (variables: Variables) => Promise<AxiosResponse<Data>>;

export type PatchAPIOptions = {
  optimize?: boolean;
};

export type DeleteAPIFunc = (id: Integerable) => Promise<AxiosResponse<{}>>;

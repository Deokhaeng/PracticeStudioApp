import { ListArgs, Paginated } from 'api/Video';
import { AxiosResponse } from 'axios';
import { Integerable } from '~types/apiTypes';

export type PaginatedCallable<T> = (args: ListArgs) => Promise<AxiosResponse<Paginated<T>>>;

export type GetApiFunc<T, U> = (variables?: (U & Integerable) | undefined, searchFilter?: U) => Promise<AxiosResponse<T, U>>;

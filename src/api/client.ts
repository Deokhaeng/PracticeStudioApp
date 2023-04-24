import { API_BASE_PATH } from '@env';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Token from 'token';
import { TokenResponse } from '../api/Auth';

const client = axios.create({
  baseURL: API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

let $$retry: boolean = false;

client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const access = await Token.getAccessToken();
    return {
      ...config,
      headers: {
        Authorization: `${access}`,
      },
    };
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async function (error: AxiosError) {
    const { response } = error;
    const requestConfig = error.config;

    if (response?.status === 401) {
      Token.moveToSigninPage();

      const refreshToken = await Token.getRefreshToken();
      if (refreshToken === null) {
        Token.removeToken();
        Token.moveToSigninPage();
        return Promise.reject(error);
      }
      $$retry = true;
      const endpoint = `/refresh?refreshToken=${refreshToken}`;
      const tokenResponse = await client.get<TokenResponse>(endpoint);
      const newToken = tokenResponse.data.accessToken;
      Token.setAccessToken(newToken);
      return {
        ...requestConfig,
        headers: {
          Authorization: `${newToken}`,
        },
      };
    } else if ($$retry) {
      Token.removeToken();
      Token.moveToSigninPage();
    }

    return Promise.reject(error);
  }
);

export { client };

export type CancelableAxiosPromise<T> = Promise<AxiosResponse<T>> & {
  cancel(): void;
};
type AvailableMethods = 'get' | 'post' | 'patch' | 'delete' | 'put';
export function makeCancelableRequest<T>(method: AvailableMethods, url: string, data: object, config: AxiosRequestConfig): CancelableAxiosPromise<T> {
  const CancelTokenImpl = axios.CancelToken;
  const source = CancelTokenImpl.source();
  const promise = client.request<T>({
    ...config,
    method,
    data,
    url,
    cancelToken: source.token,
  }) as CancelableAxiosPromise<T>;
  promise.cancel = () => {
    source.cancel('canceled');
  };
  return promise;
}

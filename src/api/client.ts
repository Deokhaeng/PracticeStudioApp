import { API_BASE_PATH } from '@env';
import API from 'api';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Token from 'token';

const client = axios.create({
  baseURL: API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

let $$retry: boolean = false;

client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const access = Token.getAccessToken();
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${access}`,
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

    if (response?.status === 401 && !$$retry) {
      const refreshToken = await Token.getRefreshToken();

      if (refreshToken === null) {
        Token.removeToken();
        Token.moveToSigninPage();
        return Promise.reject(error);
      }

      $$retry = true;

      const tokenResponse = await API.Auth.refresh({ token: refreshToken });
      const newToken = tokenResponse.data.accessToken;
      Token.setAccessToken(newToken);
      return {
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${newToken}`,
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
type AvailableMethods = 'get' | 'post' | 'patch' | 'delete';
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

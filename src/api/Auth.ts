import { AxiosResponse } from 'axios';
import { client } from './client';

export type GenderType = '남성' | '여성' | '논바이너리' | '답변하고 싶지 않음' | '기타';

export interface Response {
  error: null;
  message: string;
}
export interface TPTokenArgs {
  /** 서드 파티 타입 */
  type: 'facebook' | 'kakao' | 'apple' | 'google';
  token: string;
}

export interface TokenResponse {
  /** 액세스 토큰. 대부분의 API 요청 시 이를 필요로 합니다. */
  accessToken: string;
  /** 리프레시 토큰. 액세스 토큰 만료 시 이것을 사용하면 재발급 받을 수 있습니다. */
  refreshToken: string;
}

export interface ProfileType {
  nickname: string;
  gender: GenderType;
  profileImg: string;
  birth: string;
}

const Auth = {
  /**
   * 서드 파티 서비스를 사용한 토큰 발급을 진행합니다.
   */
  async tpToken(args: TPTokenArgs): Promise<AxiosResponse<TokenResponse>> {
    const endpoint = `/login/${args.type}?accesstoken=${args.token}`;
    return await client.get<TokenResponse>(endpoint);
  },
  refresh(args: Partial<TPTokenArgs>): Promise<AxiosResponse<TokenResponse>> {
    const endpoint = `/refresh?refreshToken=${args.token}`;

    return client.get<TokenResponse>(endpoint);
  },
  withdraw(): Promise<AxiosResponse<Response>> {
    const endpoint = `/user/withdraw`;

    return client.delete<Response>(endpoint);
  },
  putProfile(args: Partial<ProfileType>): Promise<AxiosResponse<ProfileType>> {
    const endpoint = `/user/profile`;

    return client.put<ProfileType>(endpoint, args);
  },
  getProfile(): Promise<AxiosResponse<ProfileType>> {
    const endpoint = `/user/profile`;

    return client.get<ProfileType>(endpoint);
  },
};

export default Auth;

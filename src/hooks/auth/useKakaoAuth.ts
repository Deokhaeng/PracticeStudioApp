import { login as kakaoLogin } from '@react-native-seoul/kakao-login';

function useKakaoAuth() {
  return async (): Promise<string | null> => {
    try {
      const response: any = await kakaoLogin();
      return response.accessToken;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}

export default useKakaoAuth;

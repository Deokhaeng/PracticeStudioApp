import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import API from 'api';
import { AxiosError } from 'axios';
import Token from 'token';
import { NavigationProps } from '~types/navigationTypes';
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
import useProcessAccessToken from '@hooks/auth/useProcessAccessToken';

export default function useAuth() {
  const navigation = useNavigation<NavigationProps>();
  const { processAccessToken } = useProcessAccessToken();

  const getTpToken = useMutation(API.Auth.tpToken, {
    onError: (error: AxiosError) => {
      console.log('getTpToken_error', error.response?.data);
    },
    onSuccess: (res) => {
      const result = processAccessToken({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
      if (result) {
        navigation.replace('AppMain', {});
      }
    },
  });

  const withdraw = useMutation(API.Auth.withdraw, {
    onError: (error: AxiosError) => {
      console.log('withdraw_error', error);
    },
    onSuccess: (res) => {
      Token.removeToken();
    },
  });

  const logout = () => {
    kakaoLogout();
    navigation.reset({ routes: [{ name: 'AppMain' }] });

    setTimeout(() => {
      Token.removeToken();
      navigation.replace('Auth', {});
    }, 100);
  };

  return { getTpToken, logout, withdraw };
}

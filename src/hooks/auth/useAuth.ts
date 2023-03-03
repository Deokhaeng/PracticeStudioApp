import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';
import processAccessToken from '@utils/processAccessToken';
import API from 'api';
import { AxiosError } from 'axios';
import Token from 'token';
import { NavigationProps } from '~types/navigationTypes';
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
import { useSetRecoilState } from 'recoil';
import { userState } from '@atoms/userState';

export default function useAuth() {
  const navigation = useNavigation<NavigationProps>();
  const setProfile = useSetRecoilState(userState);

  const getTpToken = useMutation(API.Auth.tpToken, {
    onError: (error: AxiosError) => {
      console.log('getTpToken_error', error.response?.data);
    },
    onSuccess: (res) => {
      console.log('resAccessToken', res);
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
      console.log(res);
      Token.removeToken();
    },
  });

  const logout = () => {
    Token.removeToken();
    // GoogleSignin.signOut();
    kakaoLogout();
    setTimeout(() => {
      navigation.replace('Auth', {});
    }, 500);
  };

  const getProfile = useQuery(['userProfile'], () => API.Auth.getProfile(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    onError: (error: AxiosError) => {
      console.log('getProfile_error', error);
    },
    onSuccess: (res) => {
      console.log(res);
      setProfile(res.data);
    },
  });

  const editProfile = useMutation(API.Auth.putProfile, {
    onError: (error: AxiosError) => {
      console.log('editProfile_error', error);
    },
    onSuccess: (res) => {
      getProfile.refetch();
      console.log(res);
    },
  });

  return { getTpToken, logout, withdraw, getProfile, editProfile };
}

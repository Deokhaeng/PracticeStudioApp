import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import processAccessToken from '@utils/processAccessToken';
import API from 'api';
import { AxiosError } from 'axios';
import { NavigationProps } from '~types/navigationTypes';

export default function useAuth() {
  const navigation = useNavigation<NavigationProps>();
  const getTpToken = useMutation(API.Auth.tpToken, {
    onError: (error: AxiosError) => {
      console.log('error', error.response?.data);
    },
    onSuccess: (res) => {
      const result = processAccessToken({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
      if (result) {
        navigation.replace('AppMain', {});
      }
    },
  });

  return { getTpToken };
}

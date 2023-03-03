import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import { useEffect } from 'react';
import Token from 'token';

const useAutoLogin = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    (async () => {
      const access = await Token.getAccessToken();
      const refresh = await Token.getRefreshToken();

      console.log(access, refresh);
      if (access || refresh) {
        navigation.replace('AppMain', {});
      } else {
      }
    })();
  }, []);
};

export default useAutoLogin;

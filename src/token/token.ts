import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenInterface } from '~types/tokenTypes';

const Token: TokenInterface = {
  getAccessToken: () => {
    return new Promise<string | null>((resolve, reject) => {
      try {
        const token = AsyncStorage.getItem('RUNTHE_ACCESS_TOKEN');
        resolve(token);
      } catch {
        reject();
      }
    });
  },
  getRefreshToken: () => {
    return new Promise<string | null>((resolve, rejects) => {
      try {
        const token = AsyncStorage.getItem('RUNTHE_REFRESH_TOKEN');
        resolve(token);
      } catch {
        rejects();
      }
    });
  },
  setAccessToken: (token: string) => {
    return new Promise<void>((resolve, rejects) => {
      try {
        AsyncStorage.setItem('RUNTHE_ACCESS_TOKEN', token);
        resolve();
      } catch {
        rejects();
      }
    });
  },
  setRefreshToken: (token: string) => {
    return new Promise<void>((resolve, rejects) => {
      try {
        AsyncStorage.setItem('RUNTHE_REFRESH_TOKEN', token);

        resolve();
      } catch {
        rejects();
      }
    });
  },
  removeToken: () => {
    return new Promise<void>((resolve, rejects) => {
      try {
        AsyncStorage.removeItem('RUNTHE_ACCESS_TOKEN');
        AsyncStorage.removeItem('RUNTHE_REFRESH_TOKEN');

        resolve();
      } catch {
        rejects();
      }
    });
  },
  moveToSigninPage: () => {
    return new Promise<void>((resolve, rejects) => {
      try {
        resolve();
      } catch {
        rejects();
      }
    });
  },
};

export default Token;

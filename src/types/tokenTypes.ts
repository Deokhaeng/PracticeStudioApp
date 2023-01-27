export type TokenInterface = {
  getAccessToken: () => Promise<string | null>;
  getRefreshToken: () => Promise<string | null>;
  removeToken: () => Promise<void>;
  setAccessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  moveToSigninPage: () => Promise<void>;
};

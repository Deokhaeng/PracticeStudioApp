import { atom } from 'recoil';

export const userState = atom<{ email: string } | null>({
  key: 'userState',
  default: null,
});

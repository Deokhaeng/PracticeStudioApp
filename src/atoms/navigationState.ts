import { atom } from 'recoil';

export const navigationState = atom<string | undefined>({
  key: 'navigationState',
  default: undefined,
});

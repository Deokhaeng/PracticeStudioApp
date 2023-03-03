import { ProfileType } from 'api/Auth';
import { atom } from 'recoil';

export const userState = atom<ProfileType | null>({
  key: 'userState',
  default: null,
});

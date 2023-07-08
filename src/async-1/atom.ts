import { atom } from 'recoil';
export const userId = atom<null | string>({
  default: null,
  key: 'userIdAtom',
});

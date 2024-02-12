import { atom, AtomEffect } from 'recoil';

const localStorageEffect =
  (key: string): AtomEffect<object | null> =>
  ({ setSelf }) => {
    const storageValue = localStorage.getItem(key);
    if (storageValue !== null) {
      setSelf(JSON.parse(storageValue));
    }
  };
export const AuthAtom = atom<object | null>({
  key: 'authAtom',
  default: null,
  effects: [localStorageEffect('sb-eonqhdspfoqonwigwrfy-auth-token')],
});

import { atom, AtomEffect, selector } from 'recoil';

import { LayoutTransition } from '@/constants';

export const LayoutAtom = atom({ key: 'layoutAtom', default: LayoutTransition.past });

const MobileEffect =
  (): AtomEffect<number> =>
  ({ setSelf }) => {
    const setWidth = () => setSelf(window.innerWidth);
    window.addEventListener('resize', setWidth);
  };

export const MobileAtom = atom({ key: 'mobileAtom', default: window.innerWidth, effects: [MobileEffect()] });
export const MobileSelector = selector({
  key: 'mobileSelector',
  get: ({ get }) => {
    const width = get(MobileAtom);
    if (width < 768) return 'mobile';
    if (width > 768 && width < 1024) return 'tablet';
    return 'desktop';
  },
});

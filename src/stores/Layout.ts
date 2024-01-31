import { atom } from 'recoil';

import { LayoutTransition } from '@/constants';

export const LayoutAtom = atom({ key: 'layoutAtom', default: LayoutTransition.past });

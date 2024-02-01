import { atom } from 'recoil';

export const PastDateAtom = atom({
  key: 'pastDateAtom',
  default: new Date().toLocaleDateString(),
});

export const AccordionAtom = atom({
  key: 'accordionAtom',
  default: 0,
});

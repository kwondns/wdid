import { atom } from 'recoil';

export const ActivityDateAtom = atom({
  key: 'activityDateAtom',
  default: new Date().toLocaleDateString(),
});

export const AccordionAtom = atom({
  key: 'accordionAtom',
  default: 0,
});

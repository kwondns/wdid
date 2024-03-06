import { atom } from 'recoil';

export const CalendarAtom = atom({
  key: 'calendarAtom',
  default: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
});

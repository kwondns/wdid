import { FutureType, PriorityType } from './Future';

export type FutureBoxType = {
  id: string;
  priority: PriorityType;
  title: string;
  created_at: string;
  updated_at: string;
  futures: FutureType[] | null;
};

export type FutureBoxPatchType = {
  id: string;
  title: string;
  priority: PriorityType;
};

export type FutureBoxCreateType = {
  priority: PriorityType;
  title: string;
};

export type FutureViewBoxType = [
  FutureBoxType & {
    futures: FutureType[] | null;
  },
];

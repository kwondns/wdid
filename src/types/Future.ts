import { FutureBoxType } from '@/types';

export type FutureType = {
  id: string;
  box_id: string;
  checked: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TodoViewType = [
  FutureBoxType.FutureBoxType & {
    futures: FutureType[];
  },
];

export type FuturePatchType = {
  id: string;
  checked?: boolean;
  content?: string;
};

export type FutureCreateType = {
  box_id: string;
  content: string;
};

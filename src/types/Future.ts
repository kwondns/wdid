export type PriorityType = 1 | 2 | 3;
export type FutureType = {
  id: string;
  box_id: string;
  checked: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type FuturePatchType = {
  id: string;
  checked?: boolean;
  content?: string;
  priority: PriorityType;
};

export type FutureCreateType = {
  box_id: string;
  content: string;
  priority: PriorityType;
};

export type FutureBoxType = {
  id: string;
  priority: 1 | 2 | 3;
  title: string;
  created_at: string;
  updated_at: string;
};

export type FutureBoxPatchType = {
  id: string;
  title: string;
};

export type FutureBoxCreateType = {
  priority: 1 | 2 | 3;
  title: string;
};

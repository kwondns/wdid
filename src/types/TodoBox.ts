export type TodoBoxType = {
  id: string;
  priority: 1 | 2 | 3;
  title: string;
  created_at: string;
  updated_at: string;
};

export type TodoBoxPatchType = {
  id: string;
  title: string;
};

export type TodoBoxCreateType = {
  priority: 1 | 2 | 3;
  title: string;
};

export type TodoType = {
  id: string;
  box_id: string;
  check: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TodoBoxType = {
  id: string;
  priority: 1 | 2 | 3;
  title: string;
  created_at: string;
  updated_at: string;
};

export type TodoViewType = TodoBoxType & {
  todos: TodoType[];
};

import { TodoBoxType } from '@/types';

export type TodoType = {
  id: string;
  box_id: string;
  checked: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TodoViewType = [
  TodoBoxType.TodoBoxType & {
    todos: TodoType[];
  },
];

export type TodoPatchType = {
  id: string;
  checked?: boolean;
  content?: string;
};

export type TodoCreateType = {
  box_id: string;
  content: string;
};

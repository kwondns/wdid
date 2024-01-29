import { FetchLib } from '@/libs';
import { TodoType } from '@/types';

export const getTodosAll = async () => FetchLib.fetchGet<TodoType.TodoViewType[]>('todos');

export const patchTodo = async (payload: TodoType.TodoPatchType) => {
  const { id, ...others } = payload;
  await FetchLib.fetchPatch(`todos/${payload.id}`, others);
};

export const createTodo = async (payload: TodoType.TodoCreateType) => {
  await FetchLib.fetchPost(`todos`, payload);
};

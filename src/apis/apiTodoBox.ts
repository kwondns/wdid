import { FetchLib } from '@/libs';
import { TodoBoxType } from '@/types';

export const patchTodoBox = async (payload: TodoBoxType.TodoBoxPatchType) => {
  const { id, ...others } = payload;
  await FetchLib.fetchPatch(`todobox/${payload.id}`, others);
};

export const createTodoBox = async (payload: TodoBoxType.TodoBoxCreateType) => {
  await FetchLib.fetchPost(`todobox`, payload);
};

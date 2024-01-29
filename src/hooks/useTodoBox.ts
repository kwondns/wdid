import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiTodoBox } from '@/apis';
import { TodoBoxType } from '@/types';

export const useTodoBoxPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchTodoBox, isPending: isPatchingBox } = useMutation({
    mutationFn: (payload: TodoBoxType.TodoBoxPatchType) => apiTodoBox.patchTodoBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
    onError: () => {}, // toast error
  });
  return { patchTodoBox, isPatchingBox };
};

export const useTodoBoxCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createTodoBox, isPending: isCreatingBox } = useMutation({
    mutationFn: (payload: TodoBoxType.TodoBoxCreateType) => apiTodoBox.createTodoBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
  });
  return { createTodoBox, isCreatingBox };
};

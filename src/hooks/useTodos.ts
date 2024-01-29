import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiTodos } from '@/apis';
import { TodoType } from '@/types';

export const useTodosAll = () => ({ queryKey: ['todos', 'all'], queryFn: apiTodos.getTodosAll });

export const useTodoPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchTodo, isPending: isPatching } = useMutation({
    mutationFn: (payload: TodoType.TodoPatchType) => apiTodos.patchTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
    onError: () => {}, // toast error
  });
  return { patchTodo, isPatching };
};

export const useTodoCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationFn: (payload: TodoType.TodoCreateType) => apiTodos.createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
  });
  return { createTodo, isCreating };
};

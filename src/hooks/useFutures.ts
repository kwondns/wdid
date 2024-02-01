import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutures } from '@/apis';
import { FutureType } from '@/types';

export const useTodosAll = () => ({ queryKey: ['todos', 'all'], queryFn: apiFutures.getFuturesAll });

export const useTodoPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchTodo, isPending: isPatching } = useMutation({
    mutationFn: (payload: FutureType.FuturePatchType) => apiFutures.patchFuture(payload),
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
    mutationFn: (payload: FutureType.FutureCreateType) => apiFutures.createFuture(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
  });
  return { createTodo, isCreating };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutureBox } from '@/apis';
import { FutureBoxType } from '@/types';

export const useTodoBoxPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchTodoBox, isPending: isPatchingBox } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxPatchType) => apiFutureBox.patchFutureBox(payload),
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
    mutationFn: (payload: FutureBoxType.FutureBoxCreateType) => apiFutureBox.createFutureBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', 'all'] });
    },
  });
  return { createTodoBox, isCreatingBox };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutureBox } from '@/apis';
import { FutureBoxType } from '@/types';

export const useFutureBoxPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchFutureBox, isPending: isPatchingBox } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxPatchType) => apiFutureBox.patchFutureBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['future', 'all'] });
    },
    onError: () => {}, // toast error
  });
  return { patchFutureBox, isPatchingBox };
};

export const useFutureBoxCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createFutureBox, isPending: isCreatingBox } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxCreateType) => apiFutureBox.createFutureBox(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['future', 'all'] });
    },
  });
  return { createFutureBox, isCreatingBox };
};

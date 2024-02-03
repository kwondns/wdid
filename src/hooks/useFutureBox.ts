import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutureBox } from '@/apis';
import { FutureBoxType } from '@/types';

export const useFutureBoxPatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchFutureBox, isPending: isPatchingBox } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxPatchType) => apiFutureBox.patchFutureBox(payload),
    onSuccess: (_, variables) => {
      switch (variables.priority) {
        case 1: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'high'] });
          break;
        }
        case 2: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'middle'] });
          break;
        }
        default: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'low'] });
        }
      }
    },
    onError: () => {}, // toast error
  });
  return { patchFutureBox, isPatchingBox };
};

export const useFutureBoxCreate = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createFutureBox,
    isPending: isCreatingBox,
    status,
  } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxCreateType) => apiFutureBox.createFutureBox(payload),
    onSuccess: (_, variables) => {
      switch (variables.priority) {
        case 1: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'high'] });
          break;
        }
        case 2: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'middle'] });
          break;
        }
        default: {
          queryClient.invalidateQueries({ queryKey: ['futures', 'low'] });
        }
      }
    },
  });
  return { createFutureBox, isCreatingBox, status };
};

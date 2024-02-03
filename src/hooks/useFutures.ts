import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutures } from '@/apis';
import { FutureType } from '@/types';

export const useFuturesHigh = () => ({ queryKey: ['futures', 'high'], queryFn: apiFutures.getFuturesHigh });
export const useFuturesMiddle = () => ({ queryKey: ['futures', 'middle'], queryFn: apiFutures.getFuturesMiddle });
export const useFuturesLow = () => ({ queryKey: ['futures', 'low'], queryFn: apiFutures.getFuturesLow });

export const useFuturePatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchFuture, isPending: isPatching } = useMutation({
    mutationFn: (payload: FutureType.FuturePatchType) => apiFutures.patchFuture(payload),
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
  return { patchFuture, isPatching };
};

export const useFutureCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createFuture, isPending: isCreating } = useMutation({
    mutationFn: (payload: FutureType.FutureCreateType) => apiFutures.createFuture(payload),
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
  return { createFuture, isCreating };
};

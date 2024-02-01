import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFutures } from '@/apis';
import { FutureType } from '@/types';

export const useFuturesAll = () => ({ queryKey: ['futures', 'all'], queryFn: apiFutures.getFuturesAll });

export const useFuturePatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchFuture, isPending: isPatching } = useMutation({
    mutationFn: (payload: FutureType.FuturePatchType) => apiFutures.patchFuture(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['futures', 'all'] });
    },
    onError: () => {}, // toast error
  });
  return { patchFuture, isPatching };
};

export const useFutureCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createFuture, isPending: isCreating } = useMutation({
    mutationFn: (payload: FutureType.FutureCreateType) => apiFutures.createFuture(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['futures', 'all'] });
    },
  });
  return { createFuture, isCreating };
};

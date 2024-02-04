import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { apiFutures } from '@/apis';
import { FutureType } from '@/types';

export const useFuturesHigh = () => ({ queryKey: ['futures', 'high'], queryFn: apiFutures.getFuturesHigh });
export const useFuturesMiddle = () => ({ queryKey: ['futures', 'middle'], queryFn: apiFutures.getFuturesMiddle });
export const useFuturesLow = () => ({ queryKey: ['futures', 'low'], queryFn: apiFutures.getFuturesLow });

export const useFuturePatch = () => {
  const queryClient = useQueryClient();
  const { mutate: patchFuture, isPending: isPatching } = useMutation({
    mutationFn: (payload: FutureType.FuturePatchType) => apiFutures.patchFuture(payload),
    onMutate: () => toast('미래를 바꾸는 중...', { autoClose: false, toastId: 'future' }),
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
      toast.update('future', { render: '미래를 바꾸었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: () => {
      toast.update('future', { render: '미래를 바꾸는데 실패했습니다!', autoClose: 3000, type: 'error' });
    },
  });
  return { patchFuture, isPatching };
};

export const useFutureCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createFuture, isPending: isCreating } = useMutation({
    mutationFn: (payload: FutureType.FutureCreateType) => apiFutures.createFuture(payload),
    onMutate: () => {
      toast('미래를 만드는 중...', { autoClose: false, toastId: 'futureCreate' });
    },
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
      toast.update('futureCreate', { render: '미래를 만들었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: () => {
      toast.update('futureCreate', { render: '미래생성에 실패했습니다.', autoClose: 3000, type: 'error' });
    },
  });
  return { createFuture, isCreating };
};

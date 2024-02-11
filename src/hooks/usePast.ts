import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { apiPast } from '@/apis';
import { PastType } from '@/types';

export function usePast(date: string) {
  return {
    queryKey: ['past', date],
    queryFn: async () => apiPast.getPast(date),
  };
}

export function usePastCreate() {
  const queryClient = useQueryClient();
  const { mutate: createPast, isPending: isCreating } = useMutation({
    mutationFn: (payload: PastType.PastCreateType) => apiPast.createPast(payload),
    onMutate: () => {
      toast('과거를 쓰는 중입니다...', { autoClose: false, toastId: 'past' });
    },
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['past', new Date().toLocaleDateString()] }),
        queryClient.invalidateQueries({ queryKey: ['past', 'count'] }),
        queryClient.invalidateQueries({ queryKey: ['present'] }),
      ]).then(async () => {
        toast.update('past', { render: '과거에 담았습니다.', autoClose: 1500, type: 'success' });
        const cleanLength = await apiPast.cleanStorage(variables.startTime, variables.content);
        if (cleanLength)
          toast.update('past', { render: `${cleanLength}개 스토리지 청소완료!`, type: 'success', autoClose: 1500 });
      });
    },
    onError: () => {
      toast.update('past', { render: '과거를 담는데 실패했습니다.', autoClose: 3000, type: 'error' });
    },
  });
  return { createPast, isCreating };
}

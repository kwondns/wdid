import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['past', new Date().toLocaleDateString()] }),
        queryClient.invalidateQueries({ queryKey: ['past', 'count'] }),
        queryClient.invalidateQueries({ queryKey: ['present'] }),
      ]);
    },
  });
  return { createPast, isCreating };
}

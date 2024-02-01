import { apiPast } from '@/apis';

export function usePast(date: string) {
  return {
    queryKey: ['past', date],
    queryFn: async () => apiPast.getPast(date),
  };
}

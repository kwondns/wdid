import { apiPast } from '@/apis';

export function usePast(date: string) {
  return {
    queryKey: ['what', 'did', 'i', 'do', date],
    queryFn: async () => apiPast.getPast(date),
  };
}

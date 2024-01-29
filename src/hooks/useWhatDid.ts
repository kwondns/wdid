import { apiWhatDid } from '@/apis';

export function useWhatDid(date: string) {
  return {
    queryKey: ['what', 'did', 'i', 'do', date],
    queryFn: async () => apiWhatDid.getWhatDid(date),
  };
}

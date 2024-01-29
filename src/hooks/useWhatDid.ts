import { apiWhatDid } from '@/apis';

export const useWhatDid = (date: string) => ({
  queryKey: ['what', 'did', 'i', 'do', date],
  queryFn: apiWhatDid.getWhatDid(date),
});

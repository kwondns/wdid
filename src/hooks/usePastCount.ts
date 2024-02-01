import { apiPastCount } from '@/apis';

export const useHowManyAll = () => ({
  queryKey: ['how', 'many', 'times'],
  queryFn: apiPastCount.getPastCountAll,
});

import { apiPastCount } from '@/apis';

export const usePastCountAll = () => ({
  queryKey: ['past', 'count'],
  queryFn: apiPastCount.getPastCountAll,
});

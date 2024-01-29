import { apiHowMany } from '@/apis';

export const useHowManyAll = () => ({
  queryKey: ['how', 'many', 'times'],
  queryFn: apiHowMany.getHowManyAll,
});

import { apiPastCalendar } from '@/apis';

export const usePastCalendar = (date: Date) => ({
  queryKey: ['past', 'calendar', date],
  queryFn: async () => apiPastCalendar.getPastCalendar(date),
});

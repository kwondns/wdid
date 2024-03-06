import { QueryClient } from '@tanstack/react-query';

import PastCalendarTemplate from '../templates/PastCalendarTemplate';
import { usePastCalendar } from '@/hooks';
import { PastCountType } from '@/types';

export function PastCalendar() {
  return <PastCalendarTemplate />;
}

export const pastCalendarLoader = (queryClient: QueryClient) => async (): Promise<PastCountType.PastCountType> => {
  const queryPastCalendar = usePastCalendar.usePastCalendar(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  return queryClient.getQueryData(queryPastCalendar.queryKey) ?? queryClient.fetchQuery(queryPastCalendar);
};

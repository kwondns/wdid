import { QueryClient } from '@tanstack/react-query';

import PastCalendarTemplate from '@/templates/PastCalendar.template';
import { makePreviousMonth } from '@/libs/date.lib';
import { usePastCalendar } from '@/hooks/usePast';
import { PastCountType } from '@/types/PastCount.type';

export function PastCalendar() {
  return <PastCalendarTemplate />;
}

export const pastCalendarLoader = (queryClient: QueryClient) => async (): Promise<PastCountType> => {
  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const prev = makePreviousMonth(thisMonth, thisMonth.getDay());
  const queryPastCalendar = usePastCalendar(prev);
  return queryClient.getQueryData(queryPastCalendar.queryKey) ?? (await queryClient.fetchQuery(queryPastCalendar));
};

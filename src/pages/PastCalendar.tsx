import { QueryClient } from '@tanstack/react-query';

import { PastCalendarTemplate } from '@/templates';
import { usePastCalendar } from '@/hooks';
import { PastCountType } from '@/types';
import { DateLib } from '@/libs';

export function PastCalendar() {
  return <PastCalendarTemplate />;
}

export const pastCalendarLoader = (queryClient: QueryClient) => async (): Promise<PastCountType.PastCountType> => {
  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const prev = DateLib.makePreviousMonth(thisMonth, thisMonth.getDay());
  const queryPastCalendar = usePastCalendar.usePastCalendar(prev);
  return queryClient.getQueryData(queryPastCalendar.queryKey) ?? (await queryClient.fetchQuery(queryPastCalendar));
};

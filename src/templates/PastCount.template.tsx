import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { usePastCountAll } from '@/hooks/usePast';
import { pastLoader } from '@/pages/Past';
import ActivityCalendar from '@/components/ActivityCalendar';
import ActivityChart from '@/components/ActivityChart';

export default function PastCountTemplate() {
  const { PastCount: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof pastLoader>>>;
  const { data } = useQuery({ ...usePastCountAll(), initialData });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 self-center p-1 md:flex-row md:p-6">
      <ActivityCalendar activities={data} />
      <ActivityChart activities={data} />
    </div>
  );
}

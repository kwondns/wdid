import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { pastLoader } from '@/pages';
import { usePastCount } from '@/hooks';
import { ActivityCalendar, ActivityChart } from '@/components';

export default function PastCountTemplate() {
  const { PastCount: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof pastLoader>>>;
  const { data } = useQuery({ ...usePastCount.usePastCountAll(), initialData });
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 self-center p-1 md:flex-row md:p-6">
      <ActivityCalendar activities={data} />
      <ActivityChart activities={data} />
    </div>
  );
}

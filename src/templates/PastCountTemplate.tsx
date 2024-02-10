import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { pastLoader } from '@/pages';
import { usePastCount } from '@/hooks';
import { ActivityCalendar } from '@/components';

export default function PastCountTemplate() {
  const { PastCount: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof pastLoader>>>;
  const { data } = useQuery({ ...usePastCount.usePastCountAll(), initialData });
  return (
    <div className="self-center p-1">
      <ActivityCalendar activities={data} />
    </div>
  );
}

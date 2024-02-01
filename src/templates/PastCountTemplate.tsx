import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { indexLoader } from '@/pages';
import { usePastCount } from '@/hooks';
import { ActivityCalendar } from '@/components';

export default function PastCountTemplate() {
  const { PastCount: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data } = useQuery({ ...usePastCount.usePastCountAll(), initialData });
  return (
    <div className="row-start-2 row-end-3 self-center p-1">
      <ActivityCalendar activities={data} />
    </div>
  );
}

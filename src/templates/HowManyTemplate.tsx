import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { indexLoader } from '@/pages';
import { useHowMany } from '@/hooks';
import { ActivityCalendar } from '@/components';

export default function HowManyTemplate() {
  const { HowMany: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data } = useQuery({ ...useHowMany.useHowManyAll(), initialData });
  return (
    <div className="p-1">
      <ActivityCalendar activities={data} />
    </div>
  );
}

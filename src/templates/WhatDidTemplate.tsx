import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { indexLoader } from '@/pages';
import { useWhatDid } from '@/hooks';
import { ActivityDocument } from '@/components';

export default function WhatDidTemplate() {
  const { WhatDid: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data } = useQuery({ ...useWhatDid.useWhatDid('2024. 1. 28'), initialData });

  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-violet-600 bg-violet-700/60 p-1">
      {data.map((activity) => (
        <ActivityDocument activity={activity} />
      ))}
    </div>
  );
}

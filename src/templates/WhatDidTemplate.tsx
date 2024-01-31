import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { indexLoader } from '@/pages';
import { useWhatDid } from '@/hooks';
import { ActivityDocument } from '@/components';
import { ActivityStore } from '@/stores';

export default function WhatDidTemplate() {
  const { WhatDid: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const activityDate = useRecoilValue(ActivityStore.ActivityDateAtom);
  const { data } = useQuery({
    ...useWhatDid.useWhatDid(activityDate),
    initialData: activityDate === new Date().toLocaleDateString() ? initialData : undefined,
  });
  return (
    <div className="row-start-3 row-end-4 overflow-y-auto rounded-2xl border-2 border-violet-600 bg-violet-700/60 p-1">
      {data?.length ? (
        data.map((activity, index) => <ActivityDocument key={activity.id} activity={activity} index={index} />)
      ) : (
        <span className="animate-bounce text-center text-2xl text-white">내가 뭘 했더라?</span>
      )}
    </div>
  );
}

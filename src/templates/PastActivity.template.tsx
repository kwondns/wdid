import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { usePast } from '@/hooks/usePast';
import { PastDateAtom } from '@/stores/Past.store';
import { pastLoader } from '@/pages/Past';
import ActivityDocument from '@/components/ActivityDocument';

export default function PastActivityTemplate() {
  const { Past: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof pastLoader>>>;
  const activityDate = useRecoilValue(PastDateAtom);
  const { data } = useQuery({
    ...usePast(activityDate),
    initialData: activityDate === new Date().toLocaleDateString() ? initialData : undefined,
  });
  return (
    <div className="mb-4 rounded-2xl border-2 border-violet-600 bg-violet-700/60 p-1 md:mb-10">
      {data?.length ? (
        data.map((activity, index) => <ActivityDocument key={activity.id} activity={activity} index={index} />)
      ) : (
        <span className="animate-bounce text-center text-white md:text-xl lg:text-2xl">내가 뭘 했더라?</span>
      )}
    </div>
  );
}

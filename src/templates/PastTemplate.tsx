import { useRecoilValue } from 'recoil';

import { HowManyTemplate, WhatDidTemplate } from '@/templates';
import { ActivityStore } from '@/stores';

export default function PastTemplate() {
  const activityDate = useRecoilValue(ActivityStore.ActivityDateAtom);
  return (
    <div className="flex w-full flex-col gap-y-2 p-2">
      <HowManyTemplate />
      <div className="flex w-full flex-col border-opacity-50">
        <div className="divider">{activityDate}</div>
      </div>
      <WhatDidTemplate />
    </div>
  );
}

import { useRecoilValue } from 'recoil';

import { PastCountTemplate, PastActivityTemplate } from '@/templates';
import { PastStore } from '@/stores';

export default function PastTemplate() {
  const activityDate = useRecoilValue(PastStore.PastDateAtom);
  return (
    <div className="flex w-full flex-col gap-y-2 p-2">
      <PastCountTemplate />
      <div className="flex w-full flex-col border-opacity-50">
        <div className="divider">{activityDate}</div>
      </div>
      <PastActivityTemplate />
    </div>
  );
}

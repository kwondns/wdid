import { useRecoilValue } from 'recoil';

import { PastCountTemplate, PastActivityTemplate } from '@/templates';
import { PastStore } from '@/stores';

const calcCount = (count: number) => {
  if (count < 60) return `${count}분`;
  if (count % 60 === 0) return `${count / 60}시간`;
  return `${Math.floor(count / 60)}시간 ${count % 60}분`;
};
export default function PastTemplate() {
  const activityDate = useRecoilValue(PastStore.PastDateAtom);
  const pastDateCount = useRecoilValue(PastStore.PastDateCountAtom);
  return (
    <div className="flex max-h-screen w-full flex-col gap-y-2 overflow-y-auto p-2">
      <PastCountTemplate />
      <div className="flex w-full flex-col border-opacity-50">
        <div className="divider">{`${activityDate} - ${calcCount(pastDateCount)}`}</div>
      </div>
      <PastActivityTemplate />
    </div>
  );
}

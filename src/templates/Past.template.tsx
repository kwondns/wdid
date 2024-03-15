import { useRecoilValue } from 'recoil';

import { PastDateAtom, PastDateCountAtom } from '@/stores/Past.store';
import PastCountTemplate from '@/templates/PastCount.template';
import PastActivityTemplate from '@/templates/PastActivity.template';

const calcCount = (count: number) => {
  if (count < 60) return `${count}분`;
  if (count % 60 === 0) return `${count / 60}시간`;
  return `${Math.floor(count / 60)}시간 ${count % 60}분`;
};
export default function PastTemplate() {
  const activityDate = useRecoilValue(PastDateAtom);
  const pastDateCount = useRecoilValue(PastDateCountAtom);
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

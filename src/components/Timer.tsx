import { useRecoilValue } from 'recoil';

import { CurrentTimeAtom, EndTimeAtom, StartTimeAtom } from '@/stores/Present.store';
import { dateFormat } from '@/libs/date.lib';

export default function Timer() {
  const time = useRecoilValue(CurrentTimeAtom);
  const startTime = useRecoilValue(StartTimeAtom);
  const endTime = useRecoilValue(EndTimeAtom);
  return (
    <div className="flex flex-col">
      <span className="text-rose-300 md:text-xl lg:text-2xl">
        {time.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
      </span>
      {startTime && (
        <span className="self-start text-sm">
          {endTime ? dateFormat(startTime, endTime) : dateFormat(startTime, time)}
        </span>
      )}
    </div>
  );
}

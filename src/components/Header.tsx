import { useRecoilState } from 'recoil';

import { Nav, Timer } from '@/components';
import { PresentStore } from '@/stores';
import { usePresent } from '@/hooks';

export default function Header() {
  const [startTime, setStartTime] = useRecoilState(PresentStore.StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(PresentStore.EndTimeAtom);
  const { patchPresent } = usePresent.usePresentPatch();
  const onClickStart = () => {
    if (startTime) return;
    const now = new Date();
    patchPresent({ startTime: now.toISOString() });
    setStartTime(now);
  };
  const onClickEnd = () => {
    if (endTime) return;
    const now = new Date();
    patchPresent({ endTime: now.toISOString() });
    setEndTime(now);
  };
  return (
    <header className="navbar flex h-14 w-screen justify-between bg-base-100">
      <Timer />
      <Nav />
      <div className="gap-x-6">
        <button className="btn btn-success px-12 text-2xl text-white" onClick={onClickStart} disabled={!!startTime}>
          시작
        </button>
        <button className="btn btn-error px-12 text-2xl text-white" onClick={onClickEnd} disabled={!!endTime}>
          종료
        </button>
      </div>
    </header>
  );
}

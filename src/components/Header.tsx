import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Timer } from '@/components';
import { PresentStore } from '@/stores';
import { usePresent } from '@/hooks';

export default function Header() {
  const [startTime, setStartTime] = useRecoilState(PresentStore.StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(PresentStore.EndTimeAtom);
  const { patchPresent } = usePresent.usePresentPatch();
  const onClickStart = () => {
    if (startTime) return;
    const now = new Date();
    patchPresent({ startTime: now });
    setStartTime(now);
  };
  const onClickEnd = () => {
    if (endTime) return;
    const now = new Date();
    patchPresent({ endTime: now });
    setEndTime(now);
  };
  return (
    <header className="navbar flex h-14 w-screen justify-between bg-base-100">
      <Timer />
      <nav className="h-full w-auto">
        <div className="tooltip tooltip-bottom" data-tip="Past">
          <Link className="btn btn-ghost" to="/past">
            <img className="size-[50px] p-2" src="/assets/past.svg" alt="past" />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Present">
          <Link className="btn btn-ghost" to="/present">
            <img className="size-[50px] p-2" src="/assets/present.svg" alt="present" />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Future">
          <Link className="btn btn-ghost" to="/future">
            <img className="size-[50px] p-2" src="/assets/future.svg" alt="future" />
          </Link>
        </div>
      </nav>
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

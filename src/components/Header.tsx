import { Link } from 'react-router-dom';

import { Timer } from '@/components';

export default function Header() {
  return (
    <header className="navbar flex h-14  w-screen justify-between bg-base-100">
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
      <div className="gap-x-2">
        <button className="btn btn-success text-success-content">시작</button>
        <button className="btn btn-error text-error-content">종료</button>
      </div>
    </header>
  );
}

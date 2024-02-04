import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LayoutStore } from '@/stores';

export default function Nav() {
  const { pathname } = useLocation();
  const layout = useRecoilValue(LayoutStore.MobileSelector);
  return (
    <nav className={`${layout === 'mobile' ? 'btm-nav z-[10000]' : 'h-full w-auto'}`}>
      <div className="tooltip tooltip-bottom" data-tip="Past">
        <Link className={`btn btn-ghost ${pathname === '/past' ? 'rounded-2xl bg-slate-500/60' : ''}`} to="/past">
          <img
            className={`size-[50px] p-2 ${pathname === '/past' ? 'scale-110' : ''}`}
            src="/assets/past.svg"
            alt="past"
          />
        </Link>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Present">
        <Link className={`btn btn-ghost ${pathname === '/present' ? 'rounded-2xl bg-slate-500/60' : ''}`} to="/present">
          <img
            className={`size-[50px] p-2 ${pathname === '/present' ? 'scale-110' : ''}`}
            src="/assets/present.svg"
            alt="present"
          />
        </Link>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Future">
        <Link className={`btn btn-ghost ${pathname === '/future' ? 'rounded-2xl bg-slate-500/60' : ''}`} to="/future">
          <img
            className={`size-[50px] p-2 ${pathname === '/future' ? 'scale-110' : ''}`}
            src="/assets/future.svg"
            alt="future"
          />
        </Link>
      </div>
    </nav>
  );
}

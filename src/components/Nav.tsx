import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LayoutStore } from '@/stores';

export default function Nav() {
  const { pathname } = useLocation();
  const layout = useRecoilValue(LayoutStore.MobileSelector);
  return (
    <nav className={`${layout === 'mobile' ? 'btm-nav z-[10000]' : 'h-full w-auto'}`}>
      <div
        className={`tooltip tooltip-bottom ${pathname === '/past' ? 'rounded-2xl bg-slate-500/60' : ''}`}
        data-tip="Past"
      >
        <Link className="btn btn-ghost size-full" to="/past">
          <img
            className={`size-[50px] origin-center p-2 ${pathname === '/past' ? 'scale-125' : ''}`}
            src="/assets/past.svg"
            alt="past"
          />
        </Link>
      </div>
      <div
        className={`tooltip tooltip-bottom ${pathname === '/present' ? 'rounded-2xl bg-slate-500/60' : ''}`}
        data-tip="Present"
      >
        <Link className="btn btn-ghost size-full" to="/present">
          <img
            className={`size-[50px] origin-center p-2 ${pathname === '/present' ? 'scale-125' : ''}`}
            src="/assets/present.svg"
            alt="present"
          />
        </Link>
      </div>
      <div
        className={`tooltip tooltip-bottom ${pathname === '/future' ? 'rounded-2xl bg-slate-500/60' : ''}`}
        data-tip="Future"
      >
        <Link className="btn btn-ghost size-full" to="/future">
          <img
            className={`size-[50px] origin-center p-2 ${pathname === '/future' ? 'scale-125' : ''}`}
            src="/assets/future.svg"
            alt="future"
          />
        </Link>
      </div>
    </nav>
  );
}

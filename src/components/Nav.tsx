import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { MobileSelector } from '@/stores/Layout.store';

export default function Nav() {
  const { pathname } = useLocation();
  const layout = useRecoilValue(MobileSelector);
  const onClickPastItem = () => {
    const detail = document.querySelector('#past-detail');
    detail?.removeAttribute('open');
  };
  return (
    <nav className={`${layout === 'mobile' ? 'btm-nav z-[10000]' : 'h-full w-auto'}`}>
      <div
        className={`tooltip tooltip-bottom ${pathname.includes('/past') ? 'rounded-2xl bg-slate-500/60' : ''}`}
        data-tip="Past"
      >
        <details
          id="past-detail"
          className={`dropdown size-full  ${layout === 'mobile' && 'dropdown-end dropdown-top'} `}
        >
          <summary className="btn btn-ghost size-full h-full">
            <img
              className={`size-[50px] origin-center p-2 ${pathname.includes('/past') ? 'scale-125' : ''}`}
              src="/assets/past.svg"
              alt="past"
            />
          </summary>
          <ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
            <li>
              <Link to="/past" onClick={onClickPastItem}>
                <img
                  className={`size-[50px] origin-center p-2 ${pathname === '/past' ? 'scale-125' : ''}`}
                  src="/assets/past-record.svg"
                  alt="past-record"
                />
                <span>기록</span>
              </Link>
            </li>
            <li>
              <Link to="/past-calendar" onClick={onClickPastItem}>
                <img
                  className={`size-[50px] origin-center p-2 ${pathname === '/past' ? 'scale-125' : ''}`}
                  src="/assets/past-calendar.svg"
                  alt="past-calendar"
                />
                <span>달력</span>
              </Link>
            </li>
          </ul>
        </details>
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

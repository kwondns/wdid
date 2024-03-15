import { useRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import Calendar from '../components/Calendar';
import { CalendarAtom } from '@/stores/Past.store';
import { usePastCalendar } from '@/hooks/usePast';

export default function PastCalendarTemplate() {
  const today = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const [current, setCurrent] = useRecoilState(CalendarAtom);
  const queryClient = useQueryClient();
  const onClickToday = () => setCurrent(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const prefetch = (targetMonth: Date) => {
    queryClient.prefetchQuery({ ...usePastCalendar(targetMonth) });
  };

  const makePreviousMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), -date.getDay() + 1);
  const onHoverPrevMonth = () => {
    prefetch(makePreviousMonth(new Date(current.getFullYear(), current.getMonth() - 1, 1)));
  };
  const onClickPrevMonth = () => {
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const onClickNextMonth = () => {
    setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const onHoverNextMonth = () => {
    prefetch(makePreviousMonth(new Date(current.getFullYear(), current.getMonth() + 1, 1)));
  };
  return (
    <div className="grid size-full grid-rows-[auto_1fr] overflow-auto">
      <div className="flex items-baseline justify-center gap-x-4">
        <button className="btn btn-circle btn-sm text-xl" onClick={onClickPrevMonth} onMouseEnter={onHoverPrevMonth}>
          &lt;
        </button>
        <span>
          {`${current.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}`}
          {current.toDateString() !== today.toDateString() && (
            <button className="btn btn-sm" onClick={onClickToday}>
              오늘 보기
            </button>
          )}
        </span>
        <button className="btn btn-circle btn-sm text-xl" onClick={onClickNextMonth} onMouseEnter={onHoverNextMonth}>
          &gt;
        </button>
        {current.toDateString() !== today.toDateString() && (
          <button className="btn fixed left-2" onClick={onClickToday}>
            오늘 보기
          </button>
        )}
      </div>
      <Calendar />
    </div>
  );
}

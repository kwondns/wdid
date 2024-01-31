import { Activity } from '@/components';
import { HowManyType } from '@/types';

type ActivityCalendarProps = {
  activities: HowManyType.HowManyType[];
};

export default function ActivityCalendar(props: ActivityCalendarProps) {
  const { activities } = props;
  return (
    <div className="grid h-[200px] w-[400px] grid-cols-10 grid-rows-4 gap-2 rounded-xl border-2 border-blue-300 p-2">
      <span className="col-start-1 col-end-11 row-start-1 row-end-2 text-center text-2xl text-white">
        최근 1개월 활동
      </span>
      {activities.map((activity) => (
        <Activity key={activity.id} date={activity.date} count={activity.count} />
      ))}
    </div>
  );
}

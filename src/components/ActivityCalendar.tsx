import { PastCountType } from '@/types/PastCount.type';
import Activity from '@/components/Activity';

type ActivityCalendarProps = {
  activities: PastCountType[] | undefined;
};

export default function ActivityCalendar(props: ActivityCalendarProps) {
  const { activities } = props;
  return (
    <div className="grid h-[150px] w-[300px] grid-cols-10 grid-rows-4 gap-1 rounded-xl border-2 border-blue-300 p-2 sm:gap-2 md:h-[200px] md:w-[500px] md:flex-[500px]">
      <span className="col-start-1 col-end-11 row-start-1 row-end-2 text-center text-white md:text-xl lg:text-2xl">
        최근 1개월 활동
      </span>
      {activities?.map((activity) => <Activity key={activity.id} date={activity.date} count={activity.count} />)}
    </div>
  );
}

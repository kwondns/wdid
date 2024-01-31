import { DateLib } from '@/libs';
import { WhatDidType } from '@/types';

type ActivityDocumentProps = {
  activity: WhatDidType.WhatDidType;
};
export default function ActivityDocument(props: ActivityDocumentProps) {
  const { activity } = props;
  return (
    <div key={activity.id} className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title flex items-center justify-between text-xl font-medium">
        <span className="flex-1 truncate">{activity.title}</span>
        <span className="text-sm">{DateLib.dateFormat(activity.startTime, activity.endTime)}</span>
      </div>
      <div className="collapse-content overflow-y-auto">
        <p>{activity.content}</p>
      </div>
    </div>
  );
}

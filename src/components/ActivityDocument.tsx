import { useRecoilState } from 'recoil';

import { DateLib } from '@/libs';
import { WhatDidType } from '@/types';
import { ActivityStore } from '@/stores';

type ActivityDocumentProps = {
  activity: WhatDidType.WhatDidType;
  index: number;
};
export default function ActivityDocument(props: ActivityDocumentProps) {
  const { activity, index } = props;
  const [accordion, setAccordion] = useRecoilState(ActivityStore.AccordionAtom);
  const onClickAccordion = () => {
    if (accordion === index) {
      setAccordion(-1);
    } else setAccordion(index);
  };
  return (
    <div key={activity.id} className="collapse collapse-arrow mb-2 bg-base-200 last:mb-0">
      <input type="radio" name={String(index)} checked={accordion === index} readOnly onClick={onClickAccordion} />
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

import { useRecoilState } from 'recoil';

import { AccordionAtom } from '@/stores/Past.store';
import { PastType } from '@/types/Past.type';
import { dateFormat } from '@/libs/date.lib';
import Markdown from '@/components/Markdown';

type ActivityDocumentProps = {
  activity: PastType;
  index: number;
};
export default function ActivityDocument(props: ActivityDocumentProps) {
  const { activity, index } = props;
  const [accordion, setAccordion] = useRecoilState(AccordionAtom);
  const onClickAccordion = () => {
    if (accordion === index) {
      setAccordion(-1);
    } else setAccordion(index);
  };
  return (
    <div key={activity.id} className="collapse collapse-arrow mb-2 bg-base-200 last:mb-0">
      <input type="radio" name={String(index)} checked={accordion === index} readOnly onClick={onClickAccordion} />
      <div className="collapse-title flex flex-col justify-between text-xl font-medium sm:flex-row sm:items-center">
        <span className="flex-1 truncate text-sm sm:text-base md:text-xl lg:text-2xl">{activity.title}</span>
        <span className="text-sm">{dateFormat(activity.startTime, activity.endTime)}</span>
      </div>
      <div className="collapse-content overflow-y-auto">
        <Markdown source={activity.content} />
      </div>
    </div>
  );
}

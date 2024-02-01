import { useRecoilState } from 'recoil';
import MDEditor from '@uiw/react-md-editor';

import { DateLib } from '@/libs';
import { PastType } from '@/types';
import { PastStore } from '@/stores';

type ActivityDocumentProps = {
  activity: PastType.PastType;
  index: number;
};
export default function ActivityDocument(props: ActivityDocumentProps) {
  const { activity, index } = props;
  const [accordion, setAccordion] = useRecoilState(PastStore.AccordionAtom);
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
        <MDEditor.Markdown source={activity.content} />
      </div>
    </div>
  );
}

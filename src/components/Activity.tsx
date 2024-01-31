import { useSetRecoilState } from 'recoil';
import { MouseEvent } from 'react';

import { ActivityStore } from '@/stores';

type ActivityProps = {
  date: string;
  count: number;
};
export default function Activity(props: ActivityProps) {
  const { date, count } = props;
  const setActivityDate = useSetRecoilState(ActivityStore.ActivityDateAtom);
  const setAccordion = useSetRecoilState(ActivityStore.AccordionAtom);
  const onClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    setActivityDate(id);
    setAccordion(0);
  };
  let color: string;
  if (count === 0) {
    color = 'bg-gray-400';
  } else if (count < 100) {
    color = 'bg-green-300';
  } else if (count < 200) {
    color = 'bg-green-500';
  } else color = 'bg-green-700';
  const dateString = new Date(date).toLocaleDateString();
  return (
    <div className="tooltip" data-tip={dateString}>
      <button type="button" id={dateString} className={`size-full rounded-lg ${color} `} onClick={onClickButton} />
    </div>
  );
}

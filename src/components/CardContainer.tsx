import { useState } from 'react';

import Card from './Card';
import { FutureType } from '@/types';

type CardContainerProps = {
  children: React.ReactNode;
  priority: FutureType.PriorityType;
  index: number;
};
export default function CardContainer(props: CardContainerProps) {
  const { children, priority, index } = props;
  const [isAddBox, setIsAddBox] = useState<boolean>(false);
  const onClickCreateBox = () => setIsAddBox(true);
  const closeCreateBox = () => setIsAddBox(false);
  return (
    <div
      className={`flex max-h-[500px] min-h-[500px] max-w-fit flex-1 overflow-x-auto overflow-y-clip px-12 pb-20 pt-10 ${priority === 3 ? 'mb-14' : ''}`}
    >
      {children}
      {isAddBox ? (
        <Card priority={priority} index={index} title="" futures={[]} closeCreateBox={closeCreateBox} />
      ) : (
        <button
          type="button"
          onClick={onClickCreateBox}
          className="btn btn-circle btn-lg my-auto ml-6 bg-blue-400/50 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4.0"
            stroke="currentColor"
            className="size-16 stroke-primary"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      )}
    </div>
  );
}

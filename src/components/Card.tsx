import { KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PriorityColor } from '@/constants';
import { FutureType } from '@/types';
import { FutureInput, FutureContent } from '@/components';
import { useFutureBox } from '@/hooks';

type CardProps = {
  // eslint-disable-next-line react/require-default-props
  id?: string;
  priority: FutureType.PriorityType;
  index: number;
  title: string;
  futures: FutureType.FutureType[];
  closeCreateBox?: () => void;
};

type FormInputType = {
  title: string;
};

export default function Card(props: CardProps) {
  const { priority, id, index, title, futures, closeCreateBox } = props;
  const { patchFutureBox, isPatchingBox } = useFutureBox.useFutureBoxPatch();
  const { createFutureBox, isCreatingBox } = useFutureBox.useFutureBoxCreate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const cardBaseStyle =
    'card min-w-[400px] shadow-md shadow-slate-800 hover:shadow-lg has-[:focus]:shadow-lg focus:shadow-lg  hover:shadow-slate-600 has-[:focus]:shadow-slate-600 focus:shadow-slate-600  text-white transition-all overflow-hidden h-[380px] hover:scale-110 has-[:focus]:scale-110 focus:scale-125  hover:z-10 has-[:focus]:z-10 focus:z-10 border-b-[6px] border-l-2 border-r-[6px] border-t-2 border-slate-900';
  const zIndexStyle = `z-[${10 - index}]`;
  const leftStyle = `-left-${index * 8}`;
  const [isInput, setIsInput] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputType>();
  const onChangeHidden = () => setIsVisible((prev) => !prev);
  const onDoubleClick = () => setIsInput(true);
  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsInput(false);
      if (closeCreateBox) {
        closeCreateBox();
      }
    }
  };
  const onSubmitTitle = (data: FormInputType) => {
    if (id) {
      const payload = { id, title: data.title, priority };
      patchFutureBox(payload);
    } else {
      const payload = { title: data.title, priority };
      createFutureBox(payload);
      if (closeCreateBox) {
        closeCreateBox();
      }
    }
    setIsInput(false);
  };
  return (
    <div className={`${cardBaseStyle} ${PriorityColor[priority].bg} ${zIndexStyle} ${leftStyle}`}>
      <div className="grid h-[380px] grid-cols-2 grid-rows-[auto_1fr_auto]">
        <div className="col-start-1 col-end-3 flex items-center justify-between border-b-4 border-b-gray-500 px-6 py-2">
          {isInput || id === undefined ? (
            <form className="w-full" onSubmit={handleSubmit(onSubmitTitle)}>
              <input
                className={`w-full text-xl  ${errors.title?.message && 'input-error'}`}
                id={id}
                autoFocus
                defaultValue={title}
                onKeyDown={onPressEnter}
                autoComplete="off"
                disabled={isPatchingBox || isCreatingBox}
                {...register('title', {
                  required: '입력해주세요',
                  minLength: { value: 2, message: '최소 2글자 입력' },
                })}
              />
            </form>
          ) : (
            <span onDoubleClick={onDoubleClick} className="truncate text-2xl">
              {title}
            </span>
          )}
          <input
            checked={isVisible}
            onChange={onChangeHidden}
            className={`${PriorityColor[priority].checkbox} checkbox rounded-full border-2`}
            type="checkbox"
          />
        </div>
        <div className="col-start-1 col-end-3 flex flex-col gap-y-2 overflow-y-auto px-2 pb-4">
          {futures.map((future) => {
            if (!isVisible && future.checked) return null;
            return <FutureContent key={future.id} future={future} checkColor={PriorityColor[priority].checkbox} />;
          })}
        </div>
        {id && <FutureInput id={id} priority={priority} />}
      </div>
    </div>
  );
}

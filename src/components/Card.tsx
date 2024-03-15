import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import PriorityColor from '@/constants/PriorityColor';
import { FutureType, PriorityType } from '@/types/Future.type';
import { useCreateFutureBox, useUpdateFutureBox } from '@/hooks/useFutures';
import FutureContent from '@/components/FutureContent';
import FutureInput from '@/components/FutureInput';

type CardProps = {
  // eslint-disable-next-line react/require-default-props
  id?: string;
  priority: PriorityType;
  index: number;
  title: string;
  future: FutureType[];
  order: number;
  checked: boolean;
  // eslint-disable-next-line react/require-default-props
  closeCreateBox?: () => void;
};

type FormInputType = {
  title: string;
};

export default function FutureCard(props: CardProps) {
  const { priority, id, index, title, future, closeCreateBox, checked, order } = props;
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: order });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'transform 0ms' : undefined,
  };

  const { updateFutureBox, isUpdating } = useUpdateFutureBox();
  const { createFutureBox, isCreating } = useCreateFutureBox();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const cardBaseStyle =
    'card min-w-[70vw] md:min-w-[400px] transition-all m-auto h-[260px] shadow-md shadow-slate-800 hover:shadow-lg has-[:focus]:shadow-lg focus:shadow-lg  hover:shadow-slate-600 has-[:focus]:shadow-slate-600 focus:shadow-slate-600 text-white overflow-hidden md:h-[380px] hover:scale-110 has-[:focus]:scale-110 focus:scale-125  hover:z-10 has-[:focus]:z-10 focus:z-10 border-b-[6px] border-l-2 border-r-[6px] border-t-2 border-slate-900';
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
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    if (id) {
      const payload = { id, checked, priority };
      updateFutureBox(payload);
    }
  };
  const onSubmitTitle = (data: FormInputType) => {
    if (id) {
      const payload = { id, title: data.title, priority };
      updateFutureBox(payload);
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
      <div className="grid h-[260px] grid-cols-2 grid-rows-[auto_1fr_auto] md:h-[380px]">
        <div className="col-start-1 col-end-3 flex items-center justify-between border-b-4 border-b-gray-500 px-6 py-2">
          {isInput || id === undefined ? (
            <form className="w-full" onSubmit={handleSubmit(onSubmitTitle)}>
              <input
                className={`w-full text-xl text-rose-500 dark:text-white  ${errors.title?.message && 'input-error'}`}
                id={id}
                defaultValue={title}
                onKeyDown={onPressEnter}
                autoComplete="off"
                disabled={isUpdating || isCreating}
                {...register('title', {
                  required: '입력해주세요',
                  minLength: { value: 2, message: '최소 2글자 입력' },
                })}
              />
            </form>
          ) : (
            <span onDoubleClick={onDoubleClick} className="truncate md:text-xl lg:text-2xl">
              {title}
            </span>
          )}
          <input
            id={id}
            type="checkbox"
            defaultChecked={checked}
            onChange={onChangeCheck}
            disabled={isUpdating}
            className={`${PriorityColor[priority].checkbox} checkbox border-2`}
          />
          <span style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrows-move"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"
              />
            </svg>
          </span>
          <input
            checked={isVisible}
            onChange={onChangeHidden}
            className={`${PriorityColor[priority].checkbox} checkbox rounded-full border-2`}
            type="checkbox"
          />
        </div>
        <div className="col-start-1 col-end-3 flex flex-col gap-y-2 overflow-y-auto px-2 pb-4">
          {future &&
            future.map((future) => {
              if (future) {
                if (!isVisible && future.checked) return null;
                return <FutureContent key={future.id} future={future} priority={priority} />;
              }
              return null;
            })}
        </div>
        {id && <FutureInput id={id} priority={priority} />}
      </div>
    </div>
  );
}

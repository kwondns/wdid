import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FutureType } from '@/types';
import { useFutures } from '@/hooks';

type FutureContentProps = {
  future: FutureType.FutureType;
  priority: FutureType.PriorityType;
};
type FormInputType = {
  content: string;
};
export default function FutureContent(props: FutureContentProps) {
  const { future, checkColor } = props;
  const { id, content, checked } = future;
  const { patchFuture, isPatching } = useFutures.useFuturePatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputType>();

  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.currentTarget;
    const payload = { id, checked };
    patchFuture(payload);
  };
  const [isInput, setIsInput] = useState<boolean>(false);
  const onDoubleClick = () => setIsInput(true);
  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsInput(false);
    }
  };

  const onSubmitContent = (data: FormInputType) => {
    setIsInput(false);
    const payload = { id, content: data.content };
    patchFuture(payload);
  };
  return (
    <div key={id} className="grid grid-cols-[auto_1fr_auto]">
      <label className={`label col-start-1 ${isInput ? 'col-end-2' : 'col-end-3'} cursor-pointer`} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChangeCheck}
          disabled={isPatching}
          className={`${checkColor} checkbox border-2`}
        />
      </label>
      {isInput ? (
        <form onSubmit={handleSubmit(onSubmitContent)}>
          <input
            className={`col-start-2 w-full p-2 text-lg ${errors.content?.message && 'input-error'}`}
            defaultValue={content}
            autoFocus
            id={id}
            autoComplete="off"
            onKeyDown={onPressEnter}
            disabled={isPatching}
            {...register('content', {
              required: '입력해주세요',
              minLength: { value: 2, message: '최소 2글자 입력' },
            })}
          />
        </form>
      ) : (
        <span
          onDoubleClick={onDoubleClick}
          className={`col-start-3 col-end-4 ml-5 origin-right truncate p-2 text-lg decoration-4 hover:text-xl ${checked && 'text-white/80 line-through decoration-gray-700'}`}
        >
          {content}
        </span>
      )}
    </div>
  );
}

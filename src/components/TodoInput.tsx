import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFutures } from '@/hooks';

type TodoInputProps = {
  id: string;
  buttonColor: string;
};

type FormInputType = {
  content: string;
};
export default function TodoInput(props: TodoInputProps) {
  const { id, buttonColor } = props;
  const [input, setInput] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormInputType>();

  const { createTodo, isCreating } = useFutures.useTodoCreate();
  const onClickOpenInput = (event: MouseEvent<HTMLButtonElement>) => {
    if (!input) {
      event.preventDefault();
      setInput((prev) => !prev);
    }
  };

  const onPressEscape = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setInput(false);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmitCreate = (data: FormInputType) => {
    createTodo({ box_id: id, content: data.content });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitCreate)} className="relative col-start-1 col-end-3 px-2 pb-2">
      <input
        type="text"
        id="content"
        placeholder="할 일 추가"
        disabled={isCreating}
        onKeyDown={onPressEscape}
        autoComplete="off"
        {...register('content', {
          required: '입력해주세요',
          minLength: { value: 2, message: '최소 2글자 입력' },
        })}
        className={`input input-bordered ${errors.content?.message ? 'input-error' : 'input-primary'} w-full max-w-full border-0 border-b-2 ${input ? 'scale-100' : 'scale-0'} transition`}
      />
      <button
        type={input ? 'submit' : 'button'}
        onClick={onClickOpenInput}
        className={`btn btn-circle ${buttonColor} btn-sm absolute inset-y-0 my-auto mt-1.5 ${input ? 'right-4' : 'left-4'} transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="4.0"
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </form>
  );
}

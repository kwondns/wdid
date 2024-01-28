import { useState } from 'react';

import { PriorityColor } from '@/constants';
import { TodoType } from '@/types';

type CardProps = {
  priority: 1 | 2 | 3;
  index: number;
  title: string;
  todos: TodoType.TodoType[];
};

export default function Card(props: CardProps) {
  const { priority, index, title, todos } = props;
  const [input, setInput] = useState(false);
  const onClickOpenInput = () => {
    setInput((prev) => !prev);
  };

  const cardBaseStyle =
    'card min-w-[400px] shadow-md shadow-slate-800 hover:shadow-lg focus:shadow-lg  hover:shadow-slate-600 focus:shadow-slate-600  text-white transition-all max-h-[380px] overflow-y-auto hover:scale-110 focus:scale-125  hover:z-10 focus:z-10 border-b-[6px] border-l-2 border-r-[6px] border-t-2 border-slate-900';
  const zIndexStyle = `z-[${10 - index}]`;
  const leftStyle = `-left-${index * 8}`;
  return (
    <div className={`${cardBaseStyle} ${PriorityColor[priority].bg}  ${zIndexStyle} ${leftStyle}  `}>
      <div className="flex flex-1 items-center justify-between border-b-4 border-b-gray-500 px-6 py-2">
        <span className="overflow-x-auto text-2xl">{title}</span>
        <input className={`${PriorityColor[priority].checkbox} checkbox rounded-full border-2`} type="checkbox" />
      </div>
      <div className="flex flex-col gap-y-2  px-4 pb-4">
        {todos.map((todo) => (
          <div key={todo.id} className="group form-control">
            <label className="label cursor-pointer p-1" htmlFor={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.check}
                className={`peer ${PriorityColor[priority].checkbox} checkbox border-2`}
              />
              <span className="p-2 text-lg decoration-4 group-hover:scale-125 peer-checked:text-white/80 peer-checked:line-through peer-checked:decoration-gray-700">
                {todo.content}
              </span>
            </label>
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="relative"
        >
          <input
            type="text"
            placeholder="할 일 추가"
            className={`input input-bordered input-primary w-full max-w-xs border-0 border-b-2 ${input ? 'scale-100' : 'scale-0'} transition`}
          />
          <button
            type="submit"
            onClick={onClickOpenInput}
            className={`btn btn-circle ${PriorityColor[priority].btn} btn-sm absolute inset-y-0 my-auto ${input ? 'right-2' : 'left-2'} transition-all`}
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
      </div>
    </div>
  );
}

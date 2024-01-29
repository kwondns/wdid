import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTodos } from 'hooks';

import { CardSet } from '@/components';
import { indexLoader } from '@/pages';

export default function TodoTemplate() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data: todoView } = useQuery({ ...useTodos.useTodosAll(), initialData });
  return (
    <div className="flex max-h-screen max-w-[90%] flex-col overflow-y-auto">
      {todoView.map((boxes) => (
        <CardSet key={boxes[0].id} todoBoxes={boxes} />
      ))}
    </div>
  );
}

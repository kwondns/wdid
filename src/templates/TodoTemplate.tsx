import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTodos } from 'hooks';

import { CardSet } from '@/components';
import { indexLoader } from '@/pages';

export default function TodoTemplate() {
  const { Todo: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data: todoView } = useQuery({ ...useTodos.useTodosAll(), initialData });
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-4 flex max-h-screen flex-col overflow-y-auto">
      {todoView.map((boxes) => (
        <CardSet key={boxes[0].id} todoBoxes={boxes} />
      ))}
    </div>
  );
}

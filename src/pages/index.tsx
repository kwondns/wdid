import { QueryClient } from '@tanstack/react-query';

import { useTodos } from '@/hooks';
import { TodoTemplate } from '@/templates';
import { TodoType } from '@/types';

export default function Index() {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <TodoTemplate />
    </div>
  );
}

export const indexLoader = (queryClient: QueryClient) => async (): Promise<TodoType.TodoViewType[]> => {
  async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    const { worker } = await import('../mocks/browser');
    return worker.start();
  }
  return enableMocking().then(async () => {
    const query = useTodos.useTodosAll();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  });
};

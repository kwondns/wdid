import { QueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { useHowMany, useTodos, useWhatDid } from '@/hooks';
import { TodoTemplate, HowManyTemplate, WhatDidTemplate } from '@/templates';
import { TodoType, HowManyType, WhatDidType } from '@/types';
import { ActivityStore } from '@/stores';

type LoaderType = {
  Todo: TodoType.TodoViewType[];
  HowMany: HowManyType.HowManyType[];
  WhatDid: WhatDidType.WhatDidType[];
};
export default function Index() {
  const activityDate = useRecoilValue(ActivityStore.ActivityDateAtom);
  return (
    <div className="grid h-screen grid-cols-[55%_45%] grid-rows-[auto_30%_70%]">
      <div className="col-start-1 col-end-2 row-start-2 row-end-4 flex h-full flex-col gap-y-2 p-2">
        <HowManyTemplate />
        <div className="flex w-full flex-col border-opacity-50">
          <div className="divider">{activityDate}</div>
        </div>
        <WhatDidTemplate />
      </div>
      <TodoTemplate />
    </div>
  );
}

export const indexLoader = (queryClient: QueryClient) => async (): Promise<LoaderType> => {
  async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    const { worker } = await import('../mocks/browser');
    // eslint-disable-next-line consistent-return
    return worker.start();
  }
  return enableMocking().then(async () => {
    const queryTodo = useTodos.useTodosAll();
    const queryHowMany = useHowMany.useHowManyAll();
    const queryWhatDid = useWhatDid.useWhatDid(new Date().toLocaleDateString());
    return {
      Todo: queryClient.getQueryData(queryTodo.queryKey) ?? (await queryClient.fetchQuery(queryTodo)),
      HowMany: queryClient.getQueryData(queryHowMany.queryKey) ?? (await queryClient.fetchQuery(queryHowMany)),
      WhatDid: queryClient.getQueryData(queryWhatDid.queryKey) ?? (await queryClient.fetchQuery(queryWhatDid)),
    };
  });
};

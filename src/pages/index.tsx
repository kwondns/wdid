import { QueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import { useHowMany, useTodos, useWhatDid } from '@/hooks';
import { Layout, TodoTemplate, HowManyTemplate, WhatDidTemplate } from '@/templates';
import { TodoType, HowManyType, WhatDidType } from '@/types';
import { ActivityStore, LayoutStore } from '@/stores';
import { FullContainer } from '@/components';
import { LayoutTransition } from '@/constants';

type LoaderType = {
  Todo: TodoType.TodoViewType[];
  HowMany: HowManyType.HowManyType[];
  WhatDid: WhatDidType.WhatDidType[];
};
export default function Index() {
  const activityDate = useRecoilValue(ActivityStore.ActivityDateAtom);
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setLayout = useSetRecoilState(LayoutStore.LayoutAtom);

  useLayoutEffect(() => {
    setLayout(LayoutTransition[location]);
  }, [location]);

  return (
    <Layout>
      <FullContainer>
        <div className="flex w-full flex-col gap-y-2 p-2">
          <HowManyTemplate />
          <div className="flex w-full flex-col border-opacity-50">
            <div className="divider">{activityDate}</div>
          </div>
          <WhatDidTemplate />
        </div>
      </FullContainer>
      <FullContainer>
        <TodoTemplate />
      </FullContainer>
    </Layout>
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

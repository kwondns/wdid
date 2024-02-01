import { QueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import { usePastCount, useFutures, usePast } from '@/hooks';
import { Layout, PastTemplate, PresentTemplate, FutureTemplate } from '@/templates';
import { FutureType, PastCountType, PastType } from '@/types';
import { LayoutStore } from '@/stores';
import { FullContainer } from '@/components';
import { LayoutTransition } from '@/constants';

type LoaderType = {
  Todo: FutureType.TodoViewType[];
  HowMany: PastCountType.PastCountType[];
  WhatDid: PastType.PastType[];
};
export default function Index() {
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setLayout = useSetRecoilState(LayoutStore.LayoutAtom);

  useLayoutEffect(() => {
    setLayout(LayoutTransition[location]);
  }, [location]);

  return (
    <Layout>
      <FullContainer>
        <PastTemplate />
      </FullContainer>
      <FullContainer>
        <PresentTemplate />
      </FullContainer>
      <FullContainer>
        <FutureTemplate />
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
    const queryTodo = useFutures.useTodosAll();
    const queryHowMany = usePastCount.useHowManyAll();
    const queryWhatDid = usePast.usePast(new Date().toLocaleDateString());
    return {
      Todo: queryClient.getQueryData(queryTodo.queryKey) ?? (await queryClient.fetchQuery(queryTodo)),
      HowMany: queryClient.getQueryData(queryHowMany.queryKey) ?? (await queryClient.fetchQuery(queryHowMany)),
      WhatDid: queryClient.getQueryData(queryWhatDid.queryKey) ?? (await queryClient.fetchQuery(queryWhatDid)),
    };
  });
};

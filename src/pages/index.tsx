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
  Future: FutureType.FutureViewType[];
  PastCount: PastCountType.PastCountType[];
  Past: PastType.PastType[];
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
    const queryFuture = useFutures.useFuturesAll();
    const queryPastCount = usePastCount.usePastCountAll();
    const queryPast = usePast.usePast(new Date().toLocaleDateString());
    return {
      Future: queryClient.getQueryData(queryFuture.queryKey) ?? (await queryClient.fetchQuery(queryFuture)),
      PastCount: queryClient.getQueryData(queryPastCount.queryKey) ?? (await queryClient.fetchQuery(queryPastCount)),
      Past: queryClient.getQueryData(queryPast.queryKey) ?? (await queryClient.fetchQuery(queryPast)),
    };
  });
};

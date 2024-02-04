import { QueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { usePastCount, useFutures, usePast, usePresent } from '@/hooks';
import { Layout, PastTemplate, PresentTemplate, FutureTemplate } from '@/templates';
import { FutureBoxType, PastCountType, PastType, PresentType } from '@/types';
import { LayoutStore } from '@/stores';
import { FullContainer } from '@/components';
import { LayoutTransition } from '@/constants';

type LoaderType = {
  FutureHigh: FutureBoxType.FutureViewBoxType;
  FutureMiddle: FutureBoxType.FutureViewBoxType;
  FutureLow: FutureBoxType.FutureViewBoxType;
  PastCount: PastCountType.PastCountType[];
  Past: PastType.PastType[];
  Present: PresentType.PresentType;
};
export default function Index() {
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setLayout = useSetRecoilState(LayoutStore.LayoutAtom);
  useEffect(() => {
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
  const queryFutureHigh = useFutures.useFuturesHigh();
  const queryFutureMiddle = useFutures.useFuturesMiddle();
  const queryFutureLow = useFutures.useFuturesLow();
  const queryPastCount = usePastCount.usePastCountAll();
  const queryPast = usePast.usePast(new Date().toLocaleDateString());
  const queryPreset = usePresent.usePresent();
  return {
    FutureHigh: queryClient.getQueryData(queryFutureHigh.queryKey) ?? (await queryClient.fetchQuery(queryFutureHigh)),
    FutureMiddle:
      queryClient.getQueryData(queryFutureMiddle.queryKey) ?? (await queryClient.fetchQuery(queryFutureMiddle)),
    FutureLow: queryClient.getQueryData(queryFutureLow.queryKey) ?? (await queryClient.fetchQuery(queryFutureLow)),
    PastCount: queryClient.getQueryData(queryPastCount.queryKey) ?? (await queryClient.fetchQuery(queryPastCount)),
    Past: queryClient.getQueryData(queryPast.queryKey) ?? (await queryClient.fetchQuery(queryPast)),
    Present: queryClient.getQueryData(queryPreset.queryKey) ?? (await queryClient.fetchQuery(queryPreset)),
  };
};

import { Suspense } from 'react';
import { QueryClient } from '@tanstack/react-query';

import { FullContainer } from '@/components';
import { FutureTemplate } from '@/templates';
import { useFutures } from '@/hooks';
import { FutureBoxType } from '@/types';

type FutureLoaderType = {
  FutureHigh: FutureBoxType.FutureViewBoxType;
  FutureMiddle: FutureBoxType.FutureViewBoxType;
  FutureLow: FutureBoxType.FutureViewBoxType;
};

export default function Future() {
  return (
    <FullContainer className="ml-[200vw]">
      <Suspense>
        <FutureTemplate />
      </Suspense>
    </FullContainer>
  );
}
export const futureLoader = (queryClient: QueryClient) => async (): Promise<FutureLoaderType> => {
  const queryFutureHigh = useFutures.useFuturesHigh();
  const queryFutureMiddle = useFutures.useFuturesMiddle();
  const queryFutureLow = useFutures.useFuturesLow();
  return {
    FutureHigh: queryClient.getQueryData(queryFutureHigh.queryKey) ?? (await queryClient.fetchQuery(queryFutureHigh)),
    FutureMiddle:
      queryClient.getQueryData(queryFutureMiddle.queryKey) ?? (await queryClient.fetchQuery(queryFutureMiddle)),
    FutureLow: queryClient.getQueryData(queryFutureLow.queryKey) ?? (await queryClient.fetchQuery(queryFutureLow)),
  };
};

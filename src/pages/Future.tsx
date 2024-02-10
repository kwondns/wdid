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

export function Future() {
  return (
    <FullContainer className="ml-[200vw]">
      <FutureTemplate />
    </FullContainer>
  );
}
export const futureLoader = (queryClient: QueryClient) => async (): Promise<FutureLoaderType> => {
  const queryFutureHigh = useFutures.useFuturesHigh();
  const queryFutureMiddle = useFutures.useFuturesMiddle();
  const queryFutureLow = useFutures.useFuturesLow();
  const fetchFutureHigh: Promise<FutureBoxType.FutureViewBoxType> =
    queryClient.getQueryData(queryFutureHigh.queryKey) ?? queryClient.fetchQuery(queryFutureHigh);
  const fetchFutureMiddle: Promise<FutureBoxType.FutureViewBoxType> =
    queryClient.getQueryData(queryFutureMiddle.queryKey) ?? queryClient.fetchQuery(queryFutureMiddle);
  const fetchFutureLow: Promise<FutureBoxType.FutureViewBoxType> =
    queryClient.getQueryData(queryFutureLow.queryKey) ?? queryClient.fetchQuery(queryFutureLow);
  const [FutureHigh, FutureMiddle, FutureLow] = await Promise.all([fetchFutureHigh, fetchFutureMiddle, fetchFutureLow]);
  return {
    FutureHigh,
    FutureMiddle,
    FutureLow,
  };
};

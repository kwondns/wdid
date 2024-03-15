import { QueryClient } from '@tanstack/react-query';

import FullContainer from '@/components/FullContainer';
import { useGetFutureHigh, useGetFutureLow, useGetFutureMiddle } from '@/hooks/useFutures';
import FutureTemplate from '@/templates/Future.template';
import { FutureBoxType } from '@/types/Future.type';

type FutureLoaderType = {
  FutureHigh: FutureBoxType[];
  FutureMiddle: FutureBoxType[];
  FutureLow: FutureBoxType[];
};

export function Future() {
  return (
    <FullContainer className="ml-[200vw]">
      <FutureTemplate />
    </FullContainer>
  );
}
export const futureLoader = (queryClient: QueryClient) => async (): Promise<FutureLoaderType> => {
  const queryFutureHigh = useGetFutureHigh();
  const queryFutureMiddle = useGetFutureMiddle();
  const queryFutureLow = useGetFutureLow();
  const fetchFutureHigh: Promise<FutureBoxType[]> =
    queryClient.getQueryData(queryFutureHigh.queryKey) ?? queryClient.fetchQuery(queryFutureHigh);
  const fetchFutureMiddle: Promise<FutureBoxType[]> =
    queryClient.getQueryData(queryFutureMiddle.queryKey) ?? queryClient.fetchQuery(queryFutureMiddle);
  const fetchFutureLow: Promise<FutureBoxType[]> =
    queryClient.getQueryData(queryFutureLow.queryKey) ?? queryClient.fetchQuery(queryFutureLow);
  const [FutureHigh, FutureMiddle, FutureLow] = await Promise.all([fetchFutureHigh, fetchFutureMiddle, fetchFutureLow]);
  return {
    FutureHigh,
    FutureMiddle,
    FutureLow,
  };
};

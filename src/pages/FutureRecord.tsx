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

export function FutureRecord() {
  return (
    <FullContainer className="ml-[300vw]">
      <FutureTemplate />
    </FullContainer>
  );
}
export const futureRecordLoader = (queryClient: QueryClient) => async (): Promise<FutureLoaderType> => {
  const queryFutureHigh = useGetFutureHigh(true);
  const queryFutureMiddle = useGetFutureMiddle(true);
  const queryFutureLow = useGetFutureLow(true);
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

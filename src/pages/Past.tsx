import { QueryClient } from '@tanstack/react-query';

import { FullContainer } from '@/components';
import { PastTemplate } from '@/templates';
import { usePast, usePastCount } from '@/hooks';
import { PastCountType, PastType } from '@/types';

type PastLoaderType = {
  PastCount: PastCountType.PastCountType[];
  Past: PastType.PastType[];
};
export function Past() {
  return (
    <FullContainer className="">
      <PastTemplate />
    </FullContainer>
  );
}
export const pastLoader = (queryClient: QueryClient) => async (): Promise<PastLoaderType> => {
  const queryPastCount = usePastCount.usePastCountAll();
  const queryPast = usePast.usePast(new Date().toLocaleDateString());
  const fetchPastCount: Promise<PastCountType.PastCountType[]> =
    queryClient.getQueryData(queryPastCount.queryKey) ?? queryClient.fetchQuery(queryPastCount);
  const fetchPast: Promise<PastType.PastType[]> =
    queryClient.getQueryData(queryPast.queryKey) ?? queryClient.fetchQuery(queryPast);
  const [PastCount, Past] = await Promise.all([fetchPastCount, fetchPast]);
  return { PastCount, Past };
};

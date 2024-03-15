import { QueryClient } from '@tanstack/react-query';

import { PastCountType } from '@/types/PastCount.type';
import { PastType } from '@/types/Past.type';
import FullContainer from '@/components/FullContainer';
import { usePast, usePastCountAll } from '@/hooks/usePast';
import PastTemplate from '@/templates/Past.template';

type PastLoaderType = {
  PastCount: PastCountType[];
  Past: PastType[];
};
export function Past() {
  return (
    <FullContainer className="">
      <PastTemplate />
    </FullContainer>
  );
}
export const pastLoader = (queryClient: QueryClient) => async (): Promise<PastLoaderType> => {
  const queryPastCount = usePastCountAll();
  const queryPast = usePast(new Date().toLocaleDateString());
  const fetchPastCount: Promise<PastCountType[]> =
    queryClient.getQueryData(queryPastCount.queryKey) ?? queryClient.fetchQuery(queryPastCount);
  const fetchPast: Promise<PastType[]> =
    queryClient.getQueryData(queryPast.queryKey) ?? queryClient.fetchQuery(queryPast);
  const [PastCount, Past] = await Promise.all([fetchPastCount, fetchPast]);
  return { PastCount, Past };
};

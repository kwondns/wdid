import { Suspense } from 'react';
import { QueryClient } from '@tanstack/react-query';

import { FullContainer } from '@/components';
import { PastTemplate } from '@/templates';
import { usePast, usePastCount } from '@/hooks';
import { PastCountType, PastType } from '@/types';

type PastLoaderType = {
  PastCount: PastCountType.PastCountType[];
  Past: PastType.PastType[];
};
export default function Past() {
  return (
    <FullContainer className="">
      <Suspense>
        <PastTemplate />
      </Suspense>
    </FullContainer>
  );
}
export const pastLoader = (queryClient: QueryClient) => async (): Promise<PastLoaderType> => {
  const queryPastCount = usePastCount.usePastCountAll();
  const queryPast = usePast.usePast(new Date().toLocaleDateString());
  return {
    PastCount: queryClient.getQueryData(queryPastCount.queryKey) ?? (await queryClient.fetchQuery(queryPastCount)),
    Past: queryClient.getQueryData(queryPast.queryKey) ?? (await queryClient.fetchQuery(queryPast)),
  };
};

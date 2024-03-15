import { QueryClient } from '@tanstack/react-query';

import FullContainer from '@/components/FullContainer';
import PresentTemplate from '@/templates/Present.template';
import { useGetPresent, useSocketPresent } from '@/hooks/usePresent';
import { PresentType } from '@/types/Present.type';

export function Present() {
  useSocketPresent();
  return (
    <FullContainer className="ml-[100vw]">
      <PresentTemplate />
    </FullContainer>
  );
}
export const presentLoader = (queryClient: QueryClient) => async (): Promise<PresentType> => {
  const queryPreset = useGetPresent();
  return queryClient.getQueryData(queryPreset.queryKey) ?? (await queryClient.fetchQuery(queryPreset));
};

import { useMutation } from '@tanstack/react-query';

import { apiPresent } from '@/apis';
import { PresentType } from '@/types';

export const usePresent = () => ({ queryKey: ['present'], queryFn: apiPresent.getPresentOne });

// TODO ERROR발생시 LocalStorage에 저장
export const usePresentPatch = () => {
  const { mutate: patchPresent, isPending: isPatching } = useMutation({
    mutationFn: (payload: PresentType.PresentType) => apiPresent.patchPresent(payload),
  });
  return { patchPresent, isPatching };
};

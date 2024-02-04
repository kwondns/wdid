import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { apiPresent } from '@/apis';
import { PresentType } from '@/types';

export const usePresent = () => ({ queryKey: ['present'], queryFn: apiPresent.getPresentOne });

// TODO ERROR발생시 LocalStorage에 저장
export const usePresentPatch = () => {
  const { mutate: patchPresent, isPending: isPatching } = useMutation({
    mutationFn: (payload: PresentType.PresentType) => apiPresent.patchPresent(payload),
    onMutate: () => {
      toast('현재를 기억하는 중...', { autoClose: false, toastId: 'presentPatch' });
    },
    onSuccess: (_, variables) => {
      let render: string;
      if (variables.startTime) render = '시작 완료';
      else if (variables.endTime) render = '종료 완료';
      else render = '기억 완료';
      toast.update('presentPatch', { render, autoClose: 1500, type: 'success' });
    },
    onError: () => {
      toast.update('presentPatch', { render: '앗! 까먹었다', autoClose: 3000, type: 'error' });
    },
  });
  return { patchPresent, isPatching };
};

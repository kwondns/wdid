import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { apiPresent } from '@/apis';
import { PresentType } from '@/types';
import { Supabase } from '@/libs';
import { PresentStore } from '@/stores';

export const usePresent = () => ({ queryKey: ['present'], queryFn: apiPresent.getPresentOne });

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
export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  const setContent = useSetRecoilState(PresentStore.MarkdownAtom);
  const setStartTime = useSetRecoilState(PresentStore.StartTimeAtom);
  const setEndTime = useSetRecoilState(PresentStore.EndTimeAtom);
  const setTitle = useSetRecoilState(PresentStore.TitleAtom);
  Supabase.supabase
    .channel('present')
    .on('postgres_changes', { event: 'UPDATE', schema: 'timeline', table: 'present' }, (payload) => {
      const { startTime, endTime, content, title } = payload.new as PresentType.PresentType;
      queryClient.setQueryData(['present'], payload.new);
      if (startTime) setStartTime(new Date(startTime));
      if (endTime) setEndTime(new Date(endTime));
      if (content) setContent(content);
      if (title) setTitle(title);
    })
    .subscribe();
};

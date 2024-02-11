import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { apiFutureBox } from '@/apis';
import { FutureBoxType } from '@/types';

export const useFutureBoxPatch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['futures', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['futures', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['futures', 'low'] }),
  };
  const { mutate: patchFutureBox, isPending: isPatchingBox } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxPatchType) => apiFutureBox.patchFutureBox(payload),
    onMutate: () => {
      toast('미래 상자를 바꾸는 중...', { autoClose: false, toastId: 'futureBox' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureBox', {
        render: `Lv${variables.priority}} 미래 상자 변경했습니다.`,
        autoClose: 1500,
        type: 'success',
      });
    },
    onError: (error) => {
      if (error.message === 'auth') {
        toast.update('futureBox', { render: '인증이 필요합니다!', type: 'error', autoClose: 3000 });
        navigate('/auth');
      }
      toast.update('futureBox', { render: '미래 상자 변경에 실패했습니다.', autoClose: 3000, type: 'error' });
    },
  });
  return { patchFutureBox, isPatchingBox };
};

export const useFutureBoxCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['futures', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['futures', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['futures', 'low'] }),
  };
  const {
    mutate: createFutureBox,
    isPending: isCreatingBox,
    status,
  } = useMutation({
    mutationFn: (payload: FutureBoxType.FutureBoxCreateType) => apiFutureBox.createFutureBox(payload),
    onMutate: (variables) => {
      toast(`Lv${variables.priority} 미래 상자 생성 중...`, { autoClose: false, toastId: 'futureBoxCreate' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureBoxCreate', {
        render: `Lv${variables.priority} 미래 상자 생성했습니다.`,
        autoClose: 1500,
        type: 'success',
      });
    },
    onError: (error) => {
      if (error.message === 'auth') {
        toast.update('past', { render: '인증이 필요합니다!', type: 'error', autoClose: 3000 });
        navigate('/auth');
      }
      toast.update('futureBoxCreate', { render: '미래 상자 생성에 실패했습니다.', autoClose: 3000, type: 'error' });
    },
  });
  return { createFutureBox, isCreatingBox, status };
};

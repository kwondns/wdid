import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { PostFetch } from '@/libs/fetch.lib';
import { AuthType } from '@/types/Auth.type';

type AuthResponseType = { data: { accessToken: string; username: string } };

export const useAuth = () => {
  const navigate = useNavigate();
  const { mutate: auth, isPending } = useMutation({
    mutationFn: async (payload: AuthType) => PostFetch<AuthType, AuthResponseType>('admin/signin', payload, true),
    onMutate: async () => {
      toast('로그인...', { autoClose: false, toastId: 'auth' });
    },
    onError: (error) => {
      toast.update('auth', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: (data) => {
      toast.update('auth', { render: '인증되었습니다!', autoClose: 1500, type: 'success' });
      localStorage.setItem('accessToken', `Bearer ${data.data.accessToken}`);
      navigate('/present');
    },
  });
  return { auth, isPending };
};

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { PostFetch, RefreshFetch } from '@/libs/fetch.lib';
import { AuthType } from '@/types/Auth.type';
import { AuthAtom, RequireAuthAtom } from '@/stores/Auth.store';

type AccessTokenType = {
  accessToken: string;
};

type AuthResponseType = AccessTokenType & {
  username: string;
};

export const useAuth = () => {
  const setAuth = useSetRecoilState(AuthAtom);
  const { mutate: auth, isPending } = useMutation({
    mutationFn: async (payload: AuthType) => PostFetch<AuthType, AuthResponseType>('admin/signin', payload),
    onMutate: async () => {
      toast('로그인...', { autoClose: false, toastId: 'auth' });
    },
    onError: (error) => {
      toast.update('auth', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: (data) => {
      toast.update('auth', { render: '인증되었습니다!', autoClose: 1500, type: 'success' });
      setAuth(data.accessToken);
    },
  });
  return { auth, isPending };
};

export const useRefresh = () => {
  const setAuth = useSetRecoilState(AuthAtom);
  const navigate = useNavigate();
  const setRequireAuth = useSetRecoilState(RequireAuthAtom);
  const { mutate: refreshToken } = useMutation({
    mutationFn: async () => RefreshFetch<AuthResponseType>(`admin/refresh`),
    onSuccess: async (data) => {
      setAuth(data.accessToken);
    },
    onError: (error) => {
      setAuth('');
      setRequireAuth(false);
      try {
        if (error.message === 'Expired Token') toast('인증이 만료되었습니다!', { type: 'error', autoClose: 2000 });
      } finally {
        navigate('/auth');
      }
    },
  });
  return { refreshToken };
};

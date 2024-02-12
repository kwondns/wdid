import { toast } from 'react-toastify';

import { Supabase } from '@/libs';
import { CredentialType } from '@/types';

export const useAuth = async (credential: CredentialType.CredentialType) => {
  try {
    toast('인증 진행 중...', { toastId: 'auth', autoClose: false });
    const { data, error } = await Supabase.supabase.auth.signInWithPassword(credential);
    await Supabase.errorCheck(error);
    toast.update('auth', { render: '인증 성공!', type: 'success', autoClose: 1500 });
    return data;
  } catch (error) {
    toast.update('auth', { render: '인증 실패!', type: 'error', autoClose: 3000 });
    return null;
  }
};

export const useAuthVerify = async () => {
  const { data, error } = await Supabase.supabase.auth.getSession();
  if (!data.session?.user) {
    return true;
  }
  await Supabase.errorCheck(error);
  return false;
};

import { Supabase } from '@/libs';
import { FutureBoxType } from '@/types';
import { useAuth } from '@/hooks';

export const patchFutureBox = async (payload: FutureBoxType.FutureBoxPatchType) => {
  const result = await useAuth.useAuthVerify();
  if (result) throw new Error('auth');
  const { id, title } = payload;
  const { data, error } = await Supabase.supabase.from('future_box').update({ title }).eq('id', id).select();
  await Supabase.errorCheck(error);
  if (data?.length === 0) throw new Error();
};

export const createFutureBox = async (payload: FutureBoxType.FutureBoxCreateType) => {
  const result = await useAuth.useAuthVerify();
  if (result) throw new Error('auth');
  const { error } = await Supabase.supabase.from('future_box').insert([{ ...payload }]);
  await Supabase.errorCheck(error);
};

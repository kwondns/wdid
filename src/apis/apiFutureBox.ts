import { Supabase } from '@/libs';
import { FutureBoxType } from '@/types';

export const patchFutureBox = async (payload: FutureBoxType.FutureBoxPatchType) => {
  const { id, title } = payload;
  const { error } = await Supabase.supabase.from('future_box').update({ title }).eq('id', id);
  Supabase.errorCheck(error);
};

export const createFutureBox = async (payload: FutureBoxType.FutureBoxCreateType) => {
  const { error } = await Supabase.supabase.from('future_box').insert([{ ...payload }]);
  Supabase.errorCheck(error);
};

import { Supabase } from '@/libs';
import { PresentType } from '@/types';

export const getPresentOne = async () => {
  const { data, error } = await Supabase.supabase.from('present').select('*');
  await Supabase.errorCheck(error);
  return data?.[0];
};

export const patchPresent = async (payload: PresentType.PresentType) => {
  const { error } = await Supabase.supabase
    .from('present')
    .update({ ...payload })
    .eq('id', 1);
  await Supabase.errorCheck(error);
};

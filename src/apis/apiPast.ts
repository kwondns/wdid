import { Supabase } from '@/libs';
import { PastType } from '@/types';

export const getPast = async (date: string) => {
  const { data, error } = await Supabase.supabase
    .from('past')
    .select('*')
    .gte('created_at', new Date(date).toISOString())
    .lte('created_at', new Date(new Date(date).getTime() + 60 * 1000 * 60 * 24 - 1).toISOString())
    .order('created_at', { ascending: true });
  Supabase.errorCheck(error);
  return data;
};

export const createPast = async (payload: PastType.PastCreateType) => {
  console.log(payload);
  const { error } = await Supabase.supabase.from('past').insert([payload]);
  Supabase.errorCheck(error);
};

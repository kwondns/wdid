import { Supabase } from '@/libs';
import { PastType } from '@/types';

export const getPast = async (date: string) => {
  const dateFormat = date.slice(0, -1).split('. ').join('/');
  const { data, error } = await Supabase.supabase
    .from('past')
    .select('*')
    .gte('startTime', new Date(dateFormat).toISOString())
    .lte('startTime', new Date(new Date(dateFormat).getTime() + 60 * 1000 * 60 * 24 - 1).toISOString())
    .order('created_at', { ascending: true });
  Supabase.errorCheck(error);
  return data;
};

export const createPast = async (payload: PastType.PastCreateType) => {
  const { error } = await Supabase.supabase.from('past').insert([payload]);
  Supabase.errorCheck(error);
};

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

export const cleanStorage = async (startTime: string, content: string) => {
  const bucketItems = await Supabase.supabase.storage.from(import.meta.env.VITE_SUPABASE_BUCKET_URL).list(startTime);
  const cleanTargets = bucketItems.data
    ?.filter((item) => !content.includes(item.name))
    .map((value) => `${startTime}/${value.name}`);
  if (cleanTargets && cleanTargets.length > 0) {
    await Supabase.supabase.storage.from(import.meta.env.VITE_SUPABASE_BUCKET_URL).remove(cleanTargets);
  }
  if (cleanTargets && cleanTargets.length > 0) return cleanTargets.length;
  return null;
};

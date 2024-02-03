import { Supabase } from '@/libs';

export const getPastCountAll = async () => {
  const { data, error } = await Supabase.supabase
    .from('past_count')
    .select('*')
    .order('date', { ascending: false })
    .limit(30);
  Supabase.errorCheck(error);
  if (data) return data.reverse();
  return null;
};

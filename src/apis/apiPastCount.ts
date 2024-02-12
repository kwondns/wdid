import { Supabase } from '@/libs';

export const getPastCountAll = async () => {
  const { data, error } = await Supabase.supabase
    .from('past_count_view')
    .select('*')
    .order('date', { ascending: false })
    .limit(30);
  await Supabase.errorCheck(error);
  if (data) return data.reverse();
  return null;
};

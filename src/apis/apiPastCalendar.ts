import { Supabase } from '@/libs';

export const getPastCalendar = async (date: Date) => {
  const { data, error } = await Supabase.supabase
    .from('past_count_view')
    .select('*')
    .gt('date', date.toISOString())
    .lt('date', new Date(date.getTime() + 60 * 1000 * 60 * 24 * 42).toISOString())
    .order('date', { ascending: false })
    .limit(42);
  await Supabase.errorCheck(error);
  if (data) return data.reverse();
  return null;
};

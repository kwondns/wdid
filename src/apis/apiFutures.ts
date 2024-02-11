import { Supabase } from '@/libs';
import { FutureType } from '@/types';

export const getFuturesHigh = async () => {
  const { data, error } = await Supabase.supabase.from('future_high_view').select('*');
  await Supabase.errorCheck(error);
  return data;
};
export const getFuturesMiddle = async () => {
  const { data, error } = await Supabase.supabase.from('future_middle_view').select('*');
  await Supabase.errorCheck(error);
  return data;
};
export const getFuturesLow = async () => {
  const { data, error } = await Supabase.supabase.from('future_low_view').select('*');
  await Supabase.errorCheck(error);
  return data;
};

export const patchFuture = async (payload: FutureType.FuturePatchType) => {
  const { id, priority, ...others } = payload;
  const { error } = await Supabase.supabase
    .from('future')
    .update({ ...others })
    .eq('id', id);
  await Supabase.errorCheck(error);
};

export const createFuture = async (payload: FutureType.FutureCreateType) => {
  const { priority, ...others } = payload;
  const { error } = await Supabase.supabase.from('future').insert([others]);
  await Supabase.errorCheck(error);
};

import { FetchLib } from '@/libs';
import { PastType } from '@/types';

export const getPast = async (date: string) => FetchLib.fetchGet<PastType.PastType[]>(`past/${date}`);

export const createPast = async (payload: PastType.PastCreateType) => {
  await FetchLib.fetchPost('past', payload);
};

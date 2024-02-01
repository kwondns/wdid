import { FetchLib } from '@/libs';
import { PresentType } from '@/types';

export const getPresentOne = async () => {
  const result = await FetchLib.fetchGet<PresentType.PresentType[]>('present');
  return result[0];
};

export const patchPresent = async (payload: PresentType.PresentType) => {
  await FetchLib.fetchPatch('present', payload);
};

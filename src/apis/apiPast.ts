import { FetchLib } from '@/libs';
import { PastType } from '@/types';

export const getPast = async (date: string) => FetchLib.fetchGet<PastType.PastType[]>(`past/${date}`);

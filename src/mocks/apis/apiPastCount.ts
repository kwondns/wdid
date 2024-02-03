import { FetchLib } from '@/libs';
import { PastCountType } from '@/types';

export const getPastCountAll = async () => FetchLib.fetchGet<PastCountType.PastCountType[]>('pastcount');

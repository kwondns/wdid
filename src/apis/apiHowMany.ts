import { FetchLib } from '@/libs';
import { HowManyType } from '@/types';

export const getHowManyAll = async () => FetchLib.fetchGet<HowManyType.HowManyType[]>('howmany');

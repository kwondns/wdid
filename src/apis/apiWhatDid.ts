import { FetchLib } from '@/libs';
import { WhatDidType } from '@/types';

export const getWhatDid = async (date: string) => FetchLib.fetchGet<WhatDidType.WhatDidType[]>(`did/${date}`);

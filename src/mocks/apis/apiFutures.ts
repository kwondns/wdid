import { FetchLib } from '@/libs';
import { FutureType } from '@/types';

export const getFuturesAll = async () => FetchLib.fetchGet<FutureType.FutureViewType[]>('futures');

export const patchFuture = async (payload: FutureType.FuturePatchType) => {
  const { id, ...others } = payload;
  await FetchLib.fetchPatch(`futures/${payload.id}`, others);
};

export const createFuture = async (payload: FutureType.FutureCreateType) => {
  await FetchLib.fetchPost(`futures`, payload);
};

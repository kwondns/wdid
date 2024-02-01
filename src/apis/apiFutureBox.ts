import { FetchLib } from '@/libs';
import { FutureBoxType } from '@/types';

export const patchFutureBox = async (payload: FutureBoxType.FutureBoxPatchType) => {
  const { id, ...others } = payload;
  await FetchLib.fetchPatch(`futurebox/${payload.id}`, others);
};

export const createFutureBox = async (payload: FutureBoxType.FutureBoxCreateType) => {
  await FetchLib.fetchPost(`futurebox`, payload);
};

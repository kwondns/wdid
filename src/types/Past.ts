export type PastCreateType = {
  title: string;
  content: string;
  startTime: string;
  endTime: string;
};

export type PastType = PastCreateType & {
  id: string;
};

import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import CardSet from '@/components/CardSet';
import CardContainer from '@/components/CardContainer';
import { useGetFutureHigh, useGetFutureLow, useGetFutureMiddle } from '@/hooks/useFutures';
import { futureRecordLoader } from '@/pages/FutureRecord';

export default function FutureTemplate() {
  const { FutureHigh, FutureMiddle, FutureLow } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof futureRecordLoader>>
  >;

  const route = useLocation();
  const [isRecord, setIsRecord] = useState(false);
  useEffect(() => {
    if (route.pathname.includes('record')) setIsRecord(true);
  }, []);

  const { data: futureHigh } = useQuery({ ...useGetFutureHigh(isRecord), initialData: FutureHigh && undefined });
  const { data: futureMiddle } = useQuery({ ...useGetFutureMiddle(isRecord), initialData: FutureMiddle && undefined });
  const { data: futureLow } = useQuery({ ...useGetFutureLow(isRecord), initialData: FutureLow && undefined });
  return (
    <div className="flex max-h-screen flex-col gap-y-4 overflow-y-auto">
      <Link className="w-screen px-6 pt-4" to={isRecord ? '/future' : '/future-record'}>
        <button type="button" className="btn btn-warning w-full">
          {isRecord ? '이전으로' : '기록 보기'}
        </button>
      </Link>
      {futureHigh?.length ? (
        <CardSet futureBoxes={futureHigh} priority={1} />
      ) : (
        <CardContainer priority={1} index={0}>
          <span className="mr-4 p-4 text-2xl text-primary">우선순위 상급</span>
        </CardContainer>
      )}
      {futureMiddle?.length ? (
        <CardSet futureBoxes={futureMiddle} priority={2} />
      ) : (
        <CardContainer priority={2} index={0}>
          <span className="mr-4 p-4 text-2xl text-secondary">우선순위 중급</span>
        </CardContainer>
      )}
      {futureLow?.length ? (
        <CardSet futureBoxes={futureLow} priority={3} />
      ) : (
        <CardContainer priority={3} index={0}>
          <span className="mr-4 p-4 text-2xl text-success">우선순위 하급</span>
        </CardContainer>
      )}
    </div>
  );
}

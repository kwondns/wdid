import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFutures } from 'hooks';

import { CardContainer, CardSet } from '@/components';
import { futureLoader } from '@/pages';

export default function FutureTemplate() {
  const { FutureHigh, FutureMiddle, FutureLow } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof futureLoader>>
  >;
  const { data: futureHigh } = useQuery({ ...useFutures.useFuturesHigh(), initialData: FutureHigh && undefined });
  const { data: futureMiddle } = useQuery({ ...useFutures.useFuturesMiddle(), initialData: FutureMiddle && undefined });
  const { data: futureLow } = useQuery({ ...useFutures.useFuturesLow(), initialData: FutureLow && undefined });
  return (
    <div className="flex max-h-screen flex-col gap-y-4 overflow-y-auto">
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

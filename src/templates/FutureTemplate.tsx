import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFutures } from 'hooks';

import { CardContainer, CardSet } from '@/components';
import { indexLoader } from '@/pages';

export default function FutureTemplate() {
  const { FutureHigh, FutureMiddle, FutureLow } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof indexLoader>>
  >;
  const { data: futureHigh } = useQuery({ ...useFutures.useFuturesHigh(), initialData: FutureHigh && undefined });
  const { data: futureMiddle } = useQuery({ ...useFutures.useFuturesMiddle(), initialData: FutureMiddle && undefined });
  const { data: futureLow } = useQuery({ ...useFutures.useFuturesLow(), initialData: FutureLow && undefined });
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-4 flex max-h-screen flex-col overflow-y-auto">
      {futureHigh ? (
        <CardSet futureBoxes={futureHigh} priority={1} />
      ) : (
        <CardContainer priority={1} index={0}>
          <span className="mr-4 p-4 text-2xl text-primary">우선순위 상급</span>
        </CardContainer>
      )}
      {futureMiddle ? (
        <CardSet futureBoxes={futureMiddle} priority={2} />
      ) : (
        <CardContainer priority={2} index={0}>
          <span className="mr-4 p-4 text-2xl text-secondary">우선순위 중급</span>
        </CardContainer>
      )}
      {futureLow ? (
        <CardSet futureBoxes={futureLow} priority={3} />
      ) : (
        <CardContainer priority={3} index={0}>
          <span className="mr-4 p-4 text-2xl text-success">우선순위 하급</span>
        </CardContainer>
      )}
    </div>
  );
}

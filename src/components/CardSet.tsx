import { Card, CardContainer } from '@/components';
import { FutureType } from '@/types';

type CardSetProps = {
  futureBoxes: FutureType.FutureViewType;
};
export default function CardSet(props: CardSetProps) {
  const { futureBoxes } = props;
  return (
    <CardContainer priority={futureBoxes[0].priority} index={futureBoxes.length}>
      {futureBoxes.map((box, index) => (
        <Card key={box.id} id={box.id} title={box.title} futures={box.futures} priority={box.priority} index={index} />
      ))}
    </CardContainer>
  );
}

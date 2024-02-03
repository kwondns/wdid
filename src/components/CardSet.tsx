import { Card, CardContainer } from '@/components';
import { FutureBoxType, FutureType } from '@/types';

type CardSetProps = {
  futureBoxes: FutureBoxType.FutureBoxType[];
  priority: FutureType.PriorityType;
};
export default function CardSet(props: CardSetProps) {
  const { futureBoxes, priority } = props;
  return (
    <CardContainer priority={priority} index={futureBoxes.length}>
      {futureBoxes.map((box, index) => (
        <Card key={box.id} id={box.id} title={box.title} futures={box.futures} priority={box.priority} index={index} />
      ))}
    </CardContainer>
  );
}

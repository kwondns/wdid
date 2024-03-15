import { FutureBoxType, PriorityType } from '@/types/Future.type';
import CardContainer from '@/components/CardContainer';
import Card from '@/components/Card';

type CardSetProps = {
  futureBoxes: FutureBoxType[];
  priority: PriorityType;
};
export default function CardSet(props: CardSetProps) {
  const { futureBoxes, priority } = props;
  return (
    <CardContainer priority={priority} index={futureBoxes.length}>
      {futureBoxes.map((box, index) => (
        <Card key={box.id} id={box.id} title={box.title} futures={box.future} priority={box.priority} index={index} />
      ))}
    </CardContainer>
  );
}

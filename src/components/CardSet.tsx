import { Card, CardContainer } from '@/components';
import { FutureType } from '@/types';

type CardSetProps = {
  todoBoxes: FutureType.TodoViewType;
};
export default function CardSet(props: CardSetProps) {
  const { todoBoxes } = props;
  return (
    <CardContainer priority={todoBoxes[0].priority} index={todoBoxes.length}>
      {todoBoxes.map((box, index) => (
        <Card key={box.id} id={box.id} title={box.title} todos={box.futures} priority={box.priority} index={index} />
      ))}
    </CardContainer>
  );
}

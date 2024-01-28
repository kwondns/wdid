import { Card, CardContainer } from '@/components';
import { TodoType } from '@/types';
import Mock from '../constants/mock';

type CardSetProps = {
  todoBoxes: TodoType.TodoBoxType[];
};
export default function CardSet(props: CardSetProps) {
  const { todoBoxes } = props;
  return (
    <CardContainer>
      {todoBoxes.map((box, index) => {
        const todos = Mock.Todo.filter((todo) => todo.box_id === box.id);
        return <Card key={box.id} title={box.title} todos={todos} priority={box.priority} index={index} />;
      })}
    </CardContainer>
  );
}

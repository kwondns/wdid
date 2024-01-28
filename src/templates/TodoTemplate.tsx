import { CardSet } from '@/components';
import Mock from '../constants/mock';

type TODOProps = {
  children: React.ReactNode;
};
export default function TodoTemplate() {
  const temp = [[], [], []];
  Mock.TodoBox.sort(({ priority: a }, { priority: b }) => a - b).forEach((box) => {
    if (box.priority === 1) temp[0].push(box);
    else if (box.priority === 2) temp[1].push(box);
    else temp[2].push(box);
  });
  return (
    <div className="flex max-h-screen max-w-[90%] flex-col overflow-y-auto">
      {temp.map((boxes) => (
        <CardSet key={boxes[0].id} todoBoxes={boxes} />
      ))}
    </div>
  );
}

type ActivityProps = {
  date: string;
  count: number;
};
export default function Activity(props: ActivityProps) {
  const { date, count } = props;
  let color = '';
  if (count === 0) {
    color = 'bg-gray-400';
  } else if (count < 100) {
    color = 'bg-green-300';
  } else if (count < 200) {
    color = 'bg-green-500';
  } else color = 'bg-green-700';
  return (
    <div className="tooltip" data-tip={new Date(date).toLocaleDateString()}>
      <button type="button" className={`size-full rounded-lg ${color} `} />
    </div>
  );
}

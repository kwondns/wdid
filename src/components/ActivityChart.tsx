import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSetRecoilState } from 'recoil';
import { CategoricalChartState } from 'recharts/types/chart/types';

import { PastCountType } from '@/types/PastCount.type';
import { AccordionAtom, PastDateAtom, PastDateCountAtom } from '@/stores/Past.store';

type ActivityChartProps = {
  activities: PastCountType[] | null;
};
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const { titles } = payload[0].payload;
    return (
      <div className="card min-w-[200px] bg-neutral/50 p-4 shadow-xl backdrop-blur-xl">
        <p>{label}</p>
        <p>{`작성한 게시글: ${payload[0].value}`}</p>
        <p>{`작업 시간: ${payload[1].value}`}</p>
        {payload[0].payload.titles[0] !== null ? (
          <div className="mt-2 flex flex-col-reverse">
            {titles.map((title: string) => (
              <p key={title} className=" text-2xl">
                {title}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return null;
}

export default function ActivityChart(props: ActivityChartProps) {
  const { activities } = props;

  const setActivityDate = useSetRecoilState(PastDateAtom);
  const setPastDateCount = useSetRecoilState(PastDateCountAtom);
  const setAccordion = useSetRecoilState(AccordionAtom);

  if (!activities) return <span>Error!</span>;
  const onClickChart = (event: CategoricalChartState) => {
    const { activeTooltipIndex } = event;
    if (activeTooltipIndex) {
      setActivityDate(new Date(activities[activeTooltipIndex].date).toLocaleDateString());
      setPastDateCount(activities[activeTooltipIndex].count);
      setAccordion(0);
    }
  };
  return (
    <div className="h-[300px] w-full overflow-x-hidden">
      <ResponsiveContainer>
        <ComposedChart
          className="select-none"
          data={activities}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          onClick={onClickChart}
        >
          <CartesianGrid stroke="#303030" />
          <XAxis dataKey="date" scale="band" />
          <YAxis orient="left" yAxisId={1} domain={['dataMin + 1', 'auto']} />
          <YAxis orientation="right" yAxisId={2} domain={[0, 'dataMax + 2']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar name="Counts" dataKey="titles_count" yAxisId={2} barSize={10} fill="#bb6667" />
          <Line
            name="Times"
            type="monotone"
            dataKey="count"
            yAxisId={1}
            activeDot={{ r: 8 }}
            stroke="#82ca9d"
            dot={<div />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

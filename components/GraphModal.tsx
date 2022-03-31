import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type Props = {
  className?: string;
};

const data = [
  {
    name: '9am',
    uv: 50,
    amt: 2400,
  },
  {
    name: '10am',
    uv: 25,
    amt: 2210,
  },
  {
    name: '11am',
    uv: 50,
    amt: 2290,
  },
  {
    name: '12pm',
    uv: 100,
    amt: 2000,
  },
  {
    name: '1pm',
    uv: 50,
    amt: 2181,
  },
  {
    name: '2pm',
    uv: 25,
    amt: 2500,
  },
  {
    name: '3pm',
    uv: 50,
    amt: 2100,
  },
];

function GraphModal({ className }: Props) {
  return (
    <div className={className}>
      <AreaChart
        width={382}
        height={265}
        data={data}
        margin={{
          top: 10,
          right: 40,
          left: 5,
          bottom: 50,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={'uv'} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </div>
  );
}

export default GraphModal;

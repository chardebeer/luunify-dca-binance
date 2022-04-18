import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import StyledDashBoardBox from 'src/styles/DashBoardBox.style';
import { Asset } from 'types';

type Props = {
  assets: Asset[];
};

function PortfolioPieChart({ assets }: Props) {
  const [data, setData] = useState(createData());
  const count = data.length - 1;

  useEffect(() => {
    if (assets.length > 4) {
      const totalValue = assets?.reduce((t, { usdValue }) => usdValue + t, 0);
      let othersValue = 0;

      const filteredData = assets?.filter((a) => {
        if (a.usdValue >= totalValue / 25) return true;
        othersValue += a.usdValue;
      });

      setData(othersValue > 0 ? [...createData(filteredData), { name: 'Other', value: othersValue }] : createData());
    } else {
      setData(createData());
    }
  }, [assets]);

  function createData(filteredAssets?: Asset[]) {
    return (filteredAssets || assets)?.map(({ symbol: name, usdValue: value }) => ({ name, value }));
  }

  function getColor(i: number, j: number, k?: number) {
    return Math.round((j / count) * (count - i) + (k || 0));
  }

  if (assets.length === 1) {
    return (
      <StyledDashBoardBox heading="Portfolio BreakDown" style={{ marginLeft: 0 }}>
        <Center height="100%">
          <Spinner />
        </Center>
      </StyledDashBoardBox>
    );
  }

  return (
    <StyledDashBoardBox heading="Portfolio BreakDown" style={{ marginLeft: 0 }}>
      <PieChart height={400} width={500}>
        <Pie
          data={data}
          cx={245}
          cy={100}
          innerRadius={35}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          labelLine={false}
          isAnimationActive={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <g>
                <circle fill="lightGray" cx={x} cy={y} r="20" />
                <text
                  x={x}
                  y={y - 5}
                  stroke="black"
                  strokeWidth="0.1px"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight={200}
                >
                  {Math.round(percent * 100)}%
                </text>
                <text
                  x={x}
                  y={y + 8}
                  stroke="gray"
                  strokeWidth="0.1px"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                  fontWeight={200}
                >
                  {name}
                </text>
              </g>
            );
          }}
        >
          {data.map((_, i) => (
            <Cell
              key={`cell-${i}`}
              fill={`rgb(${getColor(i, 98)}, ${getColor(i, 194, 26)}, ${getColor(i, 60, 155)})`}
            />
          ))}
        </Pie>
      </PieChart>
    </StyledDashBoardBox>
  );
}

export default React.memo(PortfolioPieChart);

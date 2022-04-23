import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import StyledDashBoardBox from 'src/styles/DashBoardBox.style';
import { Asset } from 'types';

type Props = {
  asset: Asset;
};

function PortfolioGraph({ asset }: Props) {
  const [data, setData] = useState([]);
  //https: cryptopanic.com/api/v1/posts/?auth_token=28e15d8a4531c0cb8d4b31483b27fce425277596&currencies=BTC,ETH
  async function getPrices() {
    try {
      const response = await fetch(
        `/api/candles?symbol=${asset.symbol.includes('USD') ? 'BTCUSDT' : `${asset.symbol}USDT`}`
      );

      if (response.ok) {
        const json = await response.json();

        setData(
          json.data.map(({ open, openTime }) => ({
            name: `${new Date(openTime).getHours()}:00`,
            price: asset.symbol.includes('USD') ? (1 / Number(open)) * 1000000 : Number(open),
          }))
        );
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPrices();
  }, [asset]);

  function getTickValue(value: number) {
    const roundedValue = asset.symbol.includes('USD') ? value.toString() : value.toFixed(value >= 1000 ? 0 : 2);
    return `${!asset.symbol.includes('USD') ? '$' : ''}${roundedValue}${asset.symbol.includes('USD') ? 'μB' : ''}`;
  }

  if (data.length === 0) {
    return (
      <StyledDashBoardBox heading="Graph">
        <Center height="100%">
          <Spinner />
        </Center>
      </StyledDashBoardBox>
    );
  }

  const CustomYAxisTick = ({ y, payload }: any) => {
    const value = getTickValue(payload.value);

    return (
      <g transform={`translate(${value.length > 5 ? 15 - value.length : 12},${y + 3.5})`}>
        <text x={0} y={0} fill="#666" fontSize={12}>
          {value}
        </text>
      </g>
    );
  };

  return (
    <StyledDashBoardBox heading="Graph">
      <AreaChart
        width={390}
        height={220}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#622EC3" stopOpacity={1} />
            <stop offset="95%" stopColor="#53E9F6" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis fontSize={12} dataKey="name" />
        <YAxis domain={['auto', 'auto']} tick={CustomYAxisTick} />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#622EC3" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </StyledDashBoardBox>
  );
}

export default React.memo(PortfolioGraph);

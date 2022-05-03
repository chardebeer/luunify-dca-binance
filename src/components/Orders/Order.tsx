import { Badge, Stack, Text, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import TableCell from '../TableCell';
import { Order as OrderType } from 'types';
import styled from 'styled-components';
import DayIcon from '../dayIcon';
import { redirect } from 'next/dist/server/api-utils';

type OrderCardProps = {
  children: React.ReactNode;
  isVertical?: boolean;
  title: string;
};

function OrderCard({ children, isVertical = false, title }: OrderCardProps) {
  return (
    <Stack
      align={isVertical ? 'initial' : 'center'}
      className="job_card"
      isInline={!isVertical}
      justify={isVertical ? 'initial' : 'space-between'}
      p="10px"
      spacing={isVertical ? 1 : 0}
      textTransform="capitalize"
    >
      <Text fontSize="sm" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        {children}
      </Text>
    </Stack>
  );
}

type Props = OrderType & {
  isMobile: boolean;
};

export default function Order({
  isMobile,
  cummulativeQuoteQty,
  executedQty,
  fills,
  orderId,
  status,
  symbol,
  transactTime,
  tradesTaken,
}: Props) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (price === 0 && fills.length > 0) {
      setPrice(fills.reduce((t, f) => t + Number(f.price), 0) / fills.length);
    }
  }, [fills]);

  if (isMobile) {
    return (
      <Stack
        borderRadius="5px"
        borderTop={`5px solid #5EDC1F`}
        mb="20px"
        p="10px"
        shadow="0 2px 5px 1px rgb(64 60 67 / 16%)"
        spacing={2}
        width="100%"
      >
        <Stack
          css={{
            '.job_card:nth-of-type(odd)': {
              backgroundColor: '#F5F5F5',
            },
          }}
          spacing={1}
        >
          <OrderCard title="symbol">{symbol}</OrderCard>
          <OrderCard title="qty">{executedQty}</OrderCard>
          <OrderCard title="avg price">{price}</OrderCard>
          <OrderCard title="usd value">${Number(cummulativeQuoteQty).toFixed(2)}</OrderCard>
          <OrderCard title="Profit %">{price}</OrderCard>
          <OrderCard title="id">{orderId}</OrderCard>
          <OrderCard isVertical title="time">
            {new Date(`${transactTime}`).toLocaleString('en-GB') || '---'}
          </OrderCard>
          <OrderCard isVertical title="status">
            <Badge colorScheme={status === 'PARTIALLY_FILLED' ? 'orange' : 'green'}>{status}</Badge>
          </OrderCard>
          <OrderCard title="ordersTaken">{tradesTaken}</OrderCard>
        </Stack>
      </Stack>
    );
  }

  const StyledTableHeader = styled.h3`
    color: #666;
    font-size: 0.8em;
  `;
  const StyledTableData = styled.div`
    color: #666;
    font-size: 1em;
    font-weight: 700;
  `;
  const StyledTableContainer = styled.div`
    display: flex-box;
    justify-content: space-between;
    margin: 15px;
  `;

  const DayContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 15px;
    list-style: none;
    .day {
      color: white;
      height: 30px;
      width: 30px;
      align-text: center;
      display: flex;
      justify-content: space-evenly;
      margin: 5px;
      padding-top: 3px;
    }
  `;
  // > li{
  //  background: ${props => props.hasPurchased ? "red" : "white"};
  //  color: ${props => props.hasPurchased ? "white" : "red"};
  //}

  return (
    <Tr>
      <TableCell isFixed>
        <div>
          <h1>{symbol}</h1>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <StyledTableContainer>
              <StyledTableHeader>Start Date</StyledTableHeader>
              <StyledTableData>
                {new Date(`${transactTime}`).toLocaleDateString('en-us', { month: 'long', year: 'numeric' }) || '---'}
              </StyledTableData>
            </StyledTableContainer>
            <StyledTableContainer>
              <StyledTableHeader>Trades</StyledTableHeader>
              <StyledTableData>4/32</StyledTableData>
            </StyledTableContainer>

            <StyledTableContainer>
              <StyledTableHeader>Status</StyledTableHeader>
              <Badge colorScheme={status === 'PARTIALLY_FILLED' ? 'orange' : 'green'}>
                <StyledTableData>{status}</StyledTableData>
              </Badge>
            </StyledTableContainer>
          </div>
        </div>
      </TableCell>
      <TableCell>Auto</TableCell>
      <TableCell>{executedQty}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>${Number(cummulativeQuoteQty).toFixed(2)}</TableCell>
      <TableCell>{orderId}</TableCell>
      <TableCell>{orderId}</TableCell>
      <TableCell>
        {new Date(`${transactTime}`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) ||
          '---'}
      </TableCell>
      <TableCell>
        <Badge colorScheme={status === 'PARTIALLY_FILLED' ? 'orange' : 'green'}>{status}</Badge>
      </TableCell>
      <TableCell>
        {tradesTaken}
        <TableCell isFixed>
          <div>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <StyledTableContainer>
                <StyledTableHeader>Current Trades</StyledTableHeader>
                <StyledTableData>
                  {new Date(`${transactTime}`).toLocaleDateString('en-us', { month: 'long', year: 'numeric' }) || '---'}
                </StyledTableData>
                <StyledTableData>
                  <DayContainer>
                    <DayIcon className="day" hasPurchased={false} day={'M'} />
                    <DayIcon className="day" hasPurchased day={'T'} />
                    <DayIcon className="day" day={'W'} />
                    <DayIcon className="day" day={'T'} />
                    <DayIcon className="day" day={'F'} />
                    <DayIcon className="day" day={'S'} />
                    <DayIcon className="day" day={'S'} />
                  </DayContainer>
                </StyledTableData>
              </StyledTableContainer>
            </div>
          </div>
        </TableCell>
      </TableCell>
    </Tr>
  );
}

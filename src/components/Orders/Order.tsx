import { Badge, Stack, Text, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import TableCell from '../TableCell';
import { Order as OrderType } from 'types';

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
          <OrderCard title="id">{orderId}</OrderCard>
          <OrderCard isVertical title="time">
            {new Date(`${transactTime}`).toLocaleString('en-GB') || '---'}
          </OrderCard>
          <OrderCard isVertical title="status">
            <Badge colorScheme={status === 'PARTIALLY_FILLED' ? 'orange' : 'green'}>{status}</Badge>
          </OrderCard>
        </Stack>
      </Stack>
    );
  }

  return (
    <Tr>
      <TableCell isFixed>{symbol}</TableCell>
      <TableCell>{executedQty}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>${Number(cummulativeQuoteQty).toFixed(2)}</TableCell>
      <TableCell>{orderId}</TableCell>
      <TableCell>{new Date(`${transactTime}`).toLocaleString('en-GB') || '---'}</TableCell>
      <TableCell>
        <Badge colorScheme={status === 'PARTIALLY_FILLED' ? 'orange' : 'green'}>{status}</Badge>
      </TableCell>
    </Tr>
  );
}

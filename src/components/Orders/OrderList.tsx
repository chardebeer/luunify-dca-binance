import { Box, Table, Tbody, Text, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from '../../client-utils';
import { Order as OrderType } from 'types';
import TableCell from '../TableCell';
import Order from './Order';

type Props = {
  orders: OrderType[];
};

export default function OrderList({ orders }: Props) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  const ordersArray = orders.map((order) => (
    <Order
      key={order.orderId}
      isMobile={isMobile}
      cummulativeQuoteQty={order.cummulativeQuoteQty}
      executedQty={order.executedQty}
      fills={order.fills}
      orderId={order.orderId}
      origQty={order.origQty}
      status={order.status}
      symbol={order.symbol}
      transactTime={order.transactTime}
    />
  ));

  return (
    <>
      <Box overflow="auto">
        <Text fontSize="2xl" fontWeight="bold" mb="20px">{`Orders(${orders.length})`}</Text>

        {isMobile ? (
          <>{ordersArray}</>
        ) : (
          <Box
            border="1px solid #DADCE0"
            borderBottom="none"
            borderRadius="5px 5px 0 0"
            height="fit-content"
            maxHeight="500px"
            overflow="auto"
            shadow="0 0 5px 5px rgb(23 24 24 / 5%), 0 1px 2px rgb(0 0 0 / 15%), 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)"
          >
            <Table
              css={{
                borderCollapse: 'separate',
                borderSpacing: 0,
              }}
            >
              <Thead>
                <Tr>
                  <TableCell isFixed isHeading>
                    Symbol
                  </TableCell>
                  <TableCell isHeading>Quantity</TableCell>
                  <TableCell isHeading>AVG Price</TableCell>
                  <TableCell isHeading>USD Value</TableCell>
                  <TableCell isHeading>Profit PRCT %</TableCell>
                  <TableCell isHeading>ID</TableCell>
                  <TableCell isHeading>Exec Time</TableCell>
                  <TableCell isHeading>Status</TableCell>
                </Tr>
              </Thead>
              <Tbody>{ordersArray}</Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </>
  );
}

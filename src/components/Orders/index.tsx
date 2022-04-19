import { useDisclosure, Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Order } from 'types';
import Loading from '../Loading';
import OrderListLoadingState from './OrderListLoadingState';

const OrderListEmptyState = dynamic(() => import('./OrderListEmptyState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

const OrderListErrorState = dynamic(() => import('./OrderListErrorState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

const JobForm = dynamic(() => import('../JobForm'), {
  loading: ({ error }) => <Loading error={error} />,
});

const OrderList = dynamic(() => import('./OrderList'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

type Props = {
  defaultTimezone: string;
  navigateToJobs: () => void;
};

export default function Orders({ defaultTimezone, navigateToJobs }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      setIsloading(true);
      const response = await fetch('/api/orders');
      if (response.ok) {
        const { data } = await response.json();
        setOrders(data);
      } else {
        throw new Error();
      }
    } catch {
      setHasError(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <Center height="100%" width="100%">
        <OrderListLoadingState />
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center height="100%" width="100%">
        {/* @ts-ignore */}
        <OrderListErrorState onRetry={fetchOrders} />
      </Center>
    );
  }

  return (
    <Center height="100%" width="100%">
      {orders.length > 0 ? (
        // @ts-ignore
        <OrderList orders={orders} />
      ) : (
        // @ts-ignore
        <OrderListEmptyState onClick={onOpen} />
      )}

      {isOpen && (
        // @ts-ignore
        <JobForm
          defaultTimezone={defaultTimezone}
          isOpen={isOpen}
          onFormClose={onClose}
          onSubmitSuccess={navigateToJobs}
        />
      )}
    </Center>
  );
}

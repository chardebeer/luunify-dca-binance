import { useDisclosure, Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import PageWrapper from 'src/components/PageWrapper';
import { Order, User } from 'types';
import Loading from '../components/Loading';
import OrderListLoadingState from '../components/Orders/OrderListLoadingState';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

const OrderListEmptyState = dynamic(() => import('../components/Orders/OrderListEmptyState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

const OrderListErrorState = dynamic(() => import('../components/Orders/OrderListErrorState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

const JobForm = dynamic(() => import('../components/JobForm'), {
  loading: ({ error }) => <Loading error={error} />,
});

const OrderList = dynamic(() => import('../components/Orders/OrderList'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <OrderListLoadingState />;
  },
});

type Props = {
  user?: User;
};

export default function Orders({ user }: Props) {
  const router = useRouter();
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

  function renderContent() {
    if (isLoading) return <OrderListLoadingState />;
    // @ts-ignore
    if (hasError) return <OrderListErrorState onRetry={fetchOrders} />;

    return (
      <>
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
            defaultTimezone={user?.timezone || ''}
            isOpen={isOpen}
            onFormClose={onClose}
            onSubmitSuccess={() => router.replace('/jobs')}
          />
        )}
      </>
    );
  }

  return (
    <PageWrapper user={user}>
      <Center height="100vh" width="100%">
        {renderContent()}
      </Center>
    </PageWrapper>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return { props: { user: session.user } };
}

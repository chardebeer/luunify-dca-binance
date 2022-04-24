import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loading';
import { Asset, User } from 'types';
import PageWrapper from 'src/components/PageWrapper';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { useIsMounted } from 'src/client-utils';

const PortfolioDefaultState = dynamic(() => import('../components/Portfolio/PortfolioDashboard'), {
  loading: ({ error }) => {
    return <Loading error={error} />;
  },
});

const PortfolioErrorState = dynamic(() => import('../components/Portfolio/PortfolioErrorState'), {
  loading: ({ error }) => {
    return <Loading error={error} />;
  },
});

type Props = {
  user?: User;
};

export default function Portfolio({ user }: Props) {
  const [assets, updateAssets] = useState<Asset[]>([{ symbol: 'USDT', price: 0, total: 0, usdValue: 0 }]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMounted = useIsMounted();

  async function fetchAssets() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/balance');

      if (response.ok) {
        const { data } = await response.json();
        if (!isMounted()) return;

        if (data.length > 0) {
          updateAssets(data);
        }

        setIsLoading(false);
        setError(false);
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();

    const timer = setInterval(fetchAssets, 15000);
    return () => clearInterval(timer);
  }, []);

  if (error) {
    return (
      <PageWrapper user={user}>
        {/* @ts-ignore */}
        <PortfolioErrorState onClick={() => fetchAssets()} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper user={user}>
      {/* @ts-ignore */}
      <PortfolioDefaultState assets={assets} fetchAssets={fetchAssets} isLoading={isLoading} />
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

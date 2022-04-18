import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../Loading';
import { Asset } from 'types';

const PortfolioDefaultState = dynamic(() => import('./PortfolioDashboard'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }

    return <Loading />;
  },
});

const PortfolioErrorState = dynamic(() => import('./PortfolioErrorState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }

    return <Loading />;
  },
});

export default function Portfolio() {
  const [assets, updateAssets] = useState<Asset[]>([{ symbol: 'USDT', price: 0, total: 0, usdValue: 0 }]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchAssets() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/balance');

      if (response.ok) {
        const { data } = await response.json();

        if (data.length > 0) {
          updateAssets(data);
        }

        setIsLoading(false);
        setError(false);
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      // setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();

    const timer = setInterval(fetchAssets, 15000);
    return () => clearInterval(timer);
  }, []);

  if (error) {
    // @ts-ignore
    return <PortfolioErrorState onClick={() => fetchAssets()} />;
  }

  // @ts-ignore
  return <PortfolioDefaultState assets={assets} fetchAssets={fetchAssets} isLoading={isLoading} />;
}

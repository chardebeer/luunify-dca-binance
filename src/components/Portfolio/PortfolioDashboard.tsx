import React, { useState } from 'react';
import PortfolioBalance from './PortfolioBalance';
import PortfolioGraph from './PortfolioGraph';
import PortfolioPieChart from './PortfolioPieChart';
import { Flex } from '@chakra-ui/react';
import { Asset } from 'types';
import NewsFeed from './NewsFeed';
import StyledExchangeActivityBox from 'src/styles/ExchangeActivityBox.style';

type Props = {
  assets: Asset[];
  fetchAssets: () => Promise<void>;
  isLoading: boolean;
};

function PortfolioDashboard({ assets, fetchAssets, isLoading }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedAsset = assets[selectedIndex];

  function onNext() {
    fetchAssets();
    return selectedIndex === assets.length - 1 ? setSelectedIndex(0) : setSelectedIndex(selectedIndex + 1);
  }

  function onPrevious() {
    fetchAssets();
    return selectedIndex === 0 ? setSelectedIndex(assets.length - 1) : setSelectedIndex(selectedIndex - 1);
  }

  return (
    <Flex>
      <div>
        <PortfolioBalance asset={selectedAsset} onNext={onNext} onPrevious={onPrevious} isLoading={isLoading} />
        <PortfolioGraph asset={selectedAsset} />
      </div>
      <div>
        <PortfolioPieChart assets={assets} />
        <NewsFeed assets={assets} />
      </div>
      <StyledExchangeActivityBox assets={assets} />
    </Flex>
  );
}

export default PortfolioDashboard;

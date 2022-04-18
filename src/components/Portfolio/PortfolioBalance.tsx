import React from 'react';
import Image from 'next/image';
import iconsInfo from 'node_modules/crypto-icons-plus/manifest.min.json';
import { Text, Flex, Spinner } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import StyledDashBoardBox from 'src/styles/DashBoardBox.style';
import { Asset } from 'types';
import { usePrevious } from 'src/client-utils';

type Props = {
  asset: Asset;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
};

function PortfolioBalance({ asset, onNext, onPrevious, isLoading }: Props) {
  const prevPrice = usePrevious<number>(asset.price);

  function getIcon() {
    return require(`../../../node_modules/crypto-icons-plus-32/src/${
      iconsInfo.find(({ symbol }) => symbol === asset.symbol)?.slug
    }.png`);
  }

  function getValue(): string {
    if (asset.symbol.includes('USD')) {
      return `1 ${asset.symbol} = ${(asset.price * 1000000).toFixed(1)} Bits`;
    }

    return `1 ${asset.symbol} = $${asset.price.toFixed(2)}`;
  }

  function renderChangeIcon() {
    if (isLoading) return <Spinner size="xs" />;
    if (asset.price >= prevPrice) return <FaArrowUp color="green" size={15} />;
    return <FaArrowDown color="red" size={15} />;
  }

  function renderButton(text: string, onClick: () => void) {
    return (
      <button onClick={onClick} style={{ color: 'grey', margin: 4, marginTop: 20, fontSize: 20, zIndex: 10 }}>
        {text}
      </button>
    );
  }

  return (
    <StyledDashBoardBox heading="Balance">
      <Flex height="75%" width="100%" alignItems="center" justifyContent="center">
        {renderButton('<', onPrevious)}

        <Flex width="80%" flexDirection="column" alignItems="center" justifyContent="center" margin="10px">
          <Flex
            position="absolute"
            left={`${155 - (asset.total > 999999 ? 15 : 0)}px`}
            top="115px"
            alignItems="center"
            justifyContent="center"
            borderRadius="100%"
            border="1px solid darkGray"
            height={50}
            width={50}
          >
            <Image height={32} width={32} src={getIcon()} alt={asset.symbol} />
          </Flex>

          <Text fontSize="5xl" textAlign="center" marginLeft="8px">
            {asset.total}
          </Text>

          <Flex alignItems="center">
            {renderChangeIcon()}
            <Text fontSize="sm" color="#333" marginLeft="10px">
              {getValue()}
            </Text>
          </Flex>
        </Flex>

        {renderButton('>', onNext)}
      </Flex>
    </StyledDashBoardBox>
  );
}

export default React.memo(PortfolioBalance);

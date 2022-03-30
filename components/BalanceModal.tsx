import React from 'react';

import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

type Props = {
  modalHeading: string;
  className?: string;
  modalText: string;
  modalValue: number;
};

function BalanceModal({ className, modalHeading, modalText, modalValue }: Props) {
  return (
    <div className={className}>
      <Stat margin="10px">
        <StatLabel fontSize="3xl">{modalHeading}</StatLabel>
        <StatNumber margin="10px">{modalValue}</StatNumber>
        <StatHelpText fontSize="xl">
          <StatArrow type="increase" />
          {modalText}
        </StatHelpText>
        <img src="img/BTC.svg" alt="Bitcoin" />
        <span>
          <button>+</button>
          <button>-</button>
        </span>
      </Stat>
    </div>
  );
}

export default BalanceModal;

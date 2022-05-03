import React, { ReactNode, CSSProperties, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  flexbox,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type Props = {
  heading?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  date?: string;
  info?: string;
  color?: string;
};

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  height: 700px;
  width: 500px;
  & h1 {
    text-align: center;
    font-size: 1.8em;
  }
  & span {
    display: flex;
    justify-content: space-evenly;
  }
  .labelWrapper {
    display: flex;
    padding: 15px;
  }
  .footer {
    text-align: center;
  }
`;

function TradeSettingsModal({ className }: Props) {
  const formatTime = (val) => val + `  Time`;
  const formatPercent = (val) => val + `  %`;

  const parse = (val) => val.replace(/^\$/, '');

  const [value, setValue] = React.useState('7');

  return (
    <Container>
      <span>
        <h1>Trade Settings</h1> <Button variant="link">Confirm</Button>
      </span>

      <FormControl as="fieldset" alignItems="center">
        <div className="labelWrapper">
          <FormLabel htmlFor="positionDoubled" mb="0">
            Open position doubled?
          </FormLabel>
          <Switch id="positionDoubled" />
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="marginCallLimit" mb="0">
            Margin Call Limit
          </FormLabel>
          <NumberInput
            id="marginCallLimit"
            onChange={(valueString) => setValue(parse(valueString))}
            value={formatTime(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="wholePositionRatio" mb="0">
            Whole Position take profit ratio
          </FormLabel>
          <NumberInput
            id="wholePositionRatio"
            onChange={(valueString) => setValue(parse(valueString))}
            value={formatPercent(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="wholePositionCallBack" mb="0">
            Whole Position take profit callback
          </FormLabel>
          <NumberInput
            id="wholePositionCallBack"
            onChange={(valueString) => setValue(parse(valueString))}
            value={formatPercent(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="wholePositionRatio" mb="0">
            Margin configuration <Button rightIcon={<ArrowForwardIcon />} colorScheme="grey" variant="link"></Button>
          </FormLabel>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="Buy in Callback" mb="0">
            Buy in callback
          </FormLabel>
          <NumberInput
            id="Buy in Callback"
            onChange={(valueString) => setValue(parse(valueString))}
            value={formatPercent(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="distributedProfit" mb="0">
            Distributed & Take Profit Allocation{' '}
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="grey" variant="link"></Button>
          </FormLabel>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="subposTakeProfitCallback" mb="0">
            Sub-position take-profit callback
          </FormLabel>
          <NumberInput
            id="subposTakeProfitCallback"
            onChange={(valueString) => setValue(parse(valueString))}
            value={formatPercent(value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>

        <div className="footer">
          <Button variant="outline" className="strategy">
            ↻ Get a Suggested Strategy
          </Button>
        </div>
      </FormControl>
    </Container>
  );
}

export default TradeSettingsModal;

import React, { ReactNode, CSSProperties, useState } from 'react';
import styled from 'styled-components';
import {
  Alert,
  AlertIcon,
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
  padding: 10px;
  height: 90vh;
  overflow: scroll;
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
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
    margin: 5px;
  }
  .inputField {
    width: 150px;
    align-items: center;
  }

  .inputButton {
    align-items: center;
  }
  .footer {
    text-align: center;
  }
`;

function TradeSettingsModal({ className }: Props) {
  const formatTime = (val) => val + `  Time`;
  const formatPercent = (val) => val + `  %`;

  const parse = (val) => val.replace(/^\$/, '');

  const [margin, setMargin] = React.useState('7');
  const [wholePoisitonRatio, setWholePoisitonRatio] = React.useState('7');
  const [wholePoisitonCallback, setWholePoisitonCallback] = React.useState('7');
  const [buyIn, setBuyIn] = React.useState('7');
  const [subPos, setSubPos] = React.useState('7');

  return (
    <Container>
      <span>
        <h1>Trade Settings</h1> <Button variant="link">Confirm</Button>
      </span>
      <Alert fontSize="xs" status="warning" textAlign="left">
        <AlertIcon />
        The first buy in amount is calculated accoridng to the currency pair,principle and trade unit
      </Alert>
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
            onChange={(valueString) => setMargin(parse(valueString))}
            value={formatTime(margin)}
            min={0}
          >
            <div className="inputField">
              <NumberInputField />
            </div>
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
            onChange={(valueString) => setWholePoisitonRatio(parse(valueString))}
            value={formatPercent(wholePoisitonRatio)}
            min={0}
          >
            <div className="inputField">
              <NumberInputField />
            </div>
            <NumberInputStepper></NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="wholePositionCallBack" mb="0">
            Whole Position take profit callback
          </FormLabel>
          <NumberInput
            id="wholePositionCallBack"
            onChange={(valueString) => setWholePoisitonCallback(parse(valueString))}
            value={formatPercent(wholePoisitonCallback)}
            min={0}
          >
            <div className="inputField">
              <NumberInputField />
            </div>
            <NumberInputStepper></NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="wholePositionRatio" mb="0">
            Margin configuration
          </FormLabel>
          <div className="inputButton">
            {' '}
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="grey" variant="link"></Button>
          </div>
        </div>
        <div className="labelWrapper">
          <div className="inputFieldLabel">
            <FormLabel htmlFor="Buy in Callback" mb="0">
              Buy in callback
            </FormLabel>
          </div>
          <NumberInput
            id="Buy in Callback"
            onChange={(valueString) => setBuyIn(parse(valueString))}
            value={formatPercent(buyIn)}
            min={0}
          >
            <div className="inputField">
              <NumberInputField />
            </div>
            <NumberInputStepper></NumberInputStepper>
          </NumberInput>
        </div>
        <div className="labelWrapper">
          <FormLabel htmlFor="distributedProfit" mb="0">
            Distributed & Take Profit Allocation{' '}
          </FormLabel>
          <div className="inputButton">
            {' '}
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="grey" variant="link"></Button>
          </div>
        </div>
        <div className="labelWrapper">
          <div className="inputFieldLabel">
            <FormLabel htmlFor="subposTakeProfitCallback" mb="0">
              Sub-position take-profit callback
            </FormLabel>
          </div>
          <NumberInput
            id="subposTakeProfitCallback"
            onChange={(valueString) => setSubPos(parse(valueString))}
            value={formatPercent(subPos)}
            min={0}
          >
            <div className="inputField">
              <NumberInputField />
            </div>
            <NumberInputStepper></NumberInputStepper>
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

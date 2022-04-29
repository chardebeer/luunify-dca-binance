import styled from 'styled-components';
import ExchangeActivityBox from 'src/components/ExchangeActivityBox';

const StyledExchangeActivityBox = styled(ExchangeActivityBox)`
  font-family: montserrat, arial;
  border-radius: 15px;
  margin: 20px;
  padding: 0.5em 0.75em;
  background-color: #eee;
  color: black;
  width: 382px;
  height: 552px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 1px 1px 1px 1px #bbb;
  overflow-y: scroll;
  overflow-x: hidden;
  > h1 {
    text-align: center;
    font-weight: 500;
    align-self: center;
    text-align: center;
    margin-top: 5px;
    margin-left: 10px;
    background-color: white;
    width: 100%;
    border-radius: 10px;
  }
  > span {
    align-items: center;
  }
  .exchangeInfo {
    background-color: #eee;
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }

  .date {
    color: #777;
    font-size: 0.8em;
    text-align: left;
    font-weight: 700;
    display: flex;
  }
  .info {
    text-align: left;
    font-size: 0.9em;
  }
  .iconHolder {
    border: 2px solid orange;
    border-radius: 50%;
    width: 1.2em;
  }
`;

export default StyledExchangeActivityBox;

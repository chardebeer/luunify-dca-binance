import styled from 'styled-components';
import TradeSettingsModal from 'src/components/TradeSettingsModal';

const StyledTradeSettingsModal = styled(TradeSettingsModal)`
  font-family: montserrat, arial;
  border-radius: 15px;
  margin: 20px;
  padding: 0.5em 0.75em;
  background-color: red;
  border: solid 2px black;
  color: green;
  width: 382px;
  height: 552px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 1px 1px 1px 1px #bbb;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default StyledTradeSettingsModal;

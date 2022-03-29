import styled from 'styled-components';
import GetStartedButton from '../components/GetStartedButton';

const StyledGetStartedButton = styled(GetStartedButton)`
  font-family: montserrat, arial;
  border-radius: 25px;
  margin: 1em;

  background-color: rgba(255, 255, 255, 0);
  color: black;
  border: solid 3px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(180deg, #78e4ff, #ff48fa);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;
  width: 140px;
  height: 35px;

  &:hover {
    box-shadow: none;
    color: white;
  }
`;

export default StyledGetStartedButton;

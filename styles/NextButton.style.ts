import styled from 'styled-components';
import NextButton from '../components/NextButton';

const StyledNextButton = styled(NextButton)`
  font-family: montserrat, arial;
  border-radius: 25px;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin: 10px;
  background: linear-gradient(180deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
  color: #ffffff;
  border: none;
  width: 88px;
  height: 39px;

  &: focus {
    color: grey;
    border: 2px solid white;
  }
`;

export default StyledNextButton;

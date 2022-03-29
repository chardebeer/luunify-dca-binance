import styled from 'styled-components';
import InputField from '../components/InputField';

const StyledInputField = styled(InputField)`
  background: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  font-family: montserrat, arial;
  border-radius: 25px;
  border: none;
  color: white;
  padding: 0.1em 1em;
  display: block;
  margin: 22px auto;
  align-items: center;
  box-sizing: border-box;
  width: 200px;
  height: 38px;
  font-weight: 600;
  &: focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default StyledInputField;

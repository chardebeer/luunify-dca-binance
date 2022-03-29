import styled from 'styled-components';
import ConfirmationModal from '../components/ConfirmationModal';

const StyledConfirmationModal = styled(ConfirmationModal)`
  font-family: montserrat, arial;
  border-radius: 25px;
  padding: 0.25em 1em;
  background-color: #eeeeee;
  color: black;
  border: 2px solid #ffffff;
  border-radius: 25px;
  width: 400px;
  height: 300px;
  display: block;
  margin: 150px auto;
  box-shadow: 1px 10px 10px #333;
`;

export default StyledConfirmationModal;

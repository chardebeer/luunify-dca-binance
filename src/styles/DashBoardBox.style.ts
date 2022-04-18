import styled from 'styled-components';
import DashBoardBox from 'src/components/DashBoardBox';

const StyledDashBoardBox = styled(DashBoardBox)`
  font-family: montserrat, arial;
  border-radius: 15px;
  margin: 20px;
  padding: 0.5em 0.75em;
  background-color: white;
  color: black;
  width: 382px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 1px 1px 1px 1px #bbb;
`;

export default StyledDashBoardBox;

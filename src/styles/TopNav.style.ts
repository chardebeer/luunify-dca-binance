import styled from 'styled-components';
import TopNav from '../components/TopNav';

const StyledTopNav = styled(TopNav)`
  height: 70px;
  width: 100%;
  color: black;
  z-index=0;
  background-color: #ffffff;
  transition: 0.5s ease;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  font-family: montserrat;
`;

export default StyledTopNav;

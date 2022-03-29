import styled from 'styled-components';
import SideNav from '../components/SideNav';

const StyledSideNav = styled(SideNav)`
  height: 100%;
  width: 70px;
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #181818;
  transition: 0.5s ease;
  overflow-x: hidden;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

export default StyledSideNav;

import styled from 'styled-components';
import SideNav from 'src/components/SideNav';

const StyledSideNav = styled(SideNav)`
  height: 100%;
  width: 70px;
  z-index: 1;
  background-color: #383838;
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

export default StyledSideNav;

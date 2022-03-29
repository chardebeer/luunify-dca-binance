import styled from 'styled-components';
import SideNavButton from '../components/SideNavButton';

const StyledSideNavButton = styled(SideNavButton)`
  background: rgb(255, 0, 0, 0);
  color: white;
  border: none;
  width: 70px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  margin: 10px;
  &: hover {
    background: #555;
  }
`;

export default StyledSideNavButton;

//rgb(255, 0, 0,0 )

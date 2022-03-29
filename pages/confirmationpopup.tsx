import React from 'react';
import styled from 'styled-components';
import StyledExitButton from 'styles/ExitButton.style';
import StyledConfirmationModal from '../styles/ConfirmationModal.style';
import GlobalStyles from '../styles/GlobalStyles';
import Link from 'next/link';

const Container = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  color: #777;
  background: #666666;
  font-family: montserrat, arial;
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
`;

export default function Confirmationpopup() {
  return (
    <Container>
      <GlobalStyles />
      <Link href="/newaccount2" passHref={true}>
        <a>
          <StyledExitButton />
        </a>
      </Link>
      <StyledConfirmationModal modalText={'Welcome Ejoke'} modalText2={'Welcome Video / Tutorial of Tool'} />
    </Container>
  );
}

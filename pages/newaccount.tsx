import styled from 'styled-components';
import StyledNextButton from '../styles/NextButton.style';
import StyledExitButton from 'styles/ExitButton.style';
import StyledModal from '../styles/Modal.style';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import Link from 'next/link';

const Container = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  color: #ffffff;
  padding: 20px;
  background: linear-gradient(180deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
  font-family: montserrat, arial;
`;

const Line = styled.hr`
  width: 35px;
  height: 8px;
  background: white;
  border: #ffffff;
  opacity: 0.5;
  display: block;
  margin: 22px auto;
  align-items: center;
`;

export default function NewAccount() {
  return (
    <Container>
      <GlobalStyles />
      <Link href="/signin" passHref={true}>
        <a>
          <StyledExitButton />
        </a>
      </Link>
      <h6>Step #2</h6>
      <h2>Connect your Binance Account</h2>
      <Line />
      <StyledModal modalText={'VIDEO FROM JUAN'} modalHeading={'ONBOARDING'}>
        <Link href="/newaccount2">
          <a>
            <StyledNextButton buttonLabel={'Next >'} />
          </a>
        </Link>
      </StyledModal>
    </Container>
  );
}

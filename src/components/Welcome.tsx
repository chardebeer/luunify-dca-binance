import { signIn } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';
import BlackButton from '../styles/BlackButton.style';
import { Box } from '@chakra-ui/react';
import StyledLogo from 'src/styles/StyledLogo.style';

const StyledPage = styled.div`
  background: linear-gradient(to top, rgba(94, 93, 93, 1) 0%, rgba(0, 0, 0, 1) 100%);
  color: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 3rem;
`;

export default function Welcome() {
  return (
    <StyledPage>
      <StyledLogo />
      <Title>Welcome to Muunbot</Title>
      <Box height={1} width={30} margin={30} bgColor="darkgrey" />
      <BlackButton onClick={() => signIn()}>Sign In</BlackButton>
    </StyledPage>
  );
}

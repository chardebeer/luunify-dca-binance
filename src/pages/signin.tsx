import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import InputField from '../styles/InputField.style';
import { Box } from '@chakra-ui/react';
import StyledLogo from 'src/styles/StyledLogo.style';

const SignInPage = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(to top, #622ec3, #4d65db, #379aee, #13ccd7);
  font-family: montserrat, arial;
`;

const Title = styled.h1`
  margin-top: 30px;
  color: #fff;
  font-size: 2rem;
`;

const Button = styled.button`
  font-family: montserrat, arial;
  border-radius: 25px;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 2px solid white;
  width: 200px;
  height: 35px;
  &: hover {
    background: white;
    color: #222222;
    border: 2px solid grey;
  }
  &: focus {
    background: white;
    color: #222222;
    border: 2px solid grey;
  }
`;

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const [email, setEmail] = useState('');

  return (
    <SignInPage>
      <StyledLogo />

      <Title>Ready to Automate?</Title>

      <Box height={1} width={30} marginTop={30} marginBottom={3} bgColor="white" opacity={0.5} />

      <InputField
        type="email"
        name="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button onClick={() => signIn('email', { email, callbackUrl: callbackUrl as string })}>Sign in with Email</Button>
    </SignInPage>
  );
}

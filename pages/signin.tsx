import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import StyledInputField from 'styles/InputField.style';
import StyledNextButton from '../styles/NextButton.style';
import Link from 'next/link';
import StyledExitButton from 'styles/ExitButton.style';
import GlobalStyles from '../styles/GlobalStyles';

const SignInPage = styled.div`
  background: linear-gradient(180deg, rgba(94, 93, 93, 1) 0%, rgba(0, 0, 0, 1) 100%);
  color: #ffffff;
  padding: 20px;
  align-content: center;
  justify-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 600;
  font-size: 3rem;
  font-family: sans-serif;
`;

const Btn = styled.button`
  background-image: linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%);
  margin: 10px;
  padding: 15px 45px;
  align-self: center;
  justify-self: center;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 33px;
  display: block;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SignInPage>
      <GlobalStyles />
      <Link href="/" passHref={true}>
        <a>
          <StyledExitButton />
        </a>
      </Link>
      <Title> Please enter your email address.</Title>
      <div>
        <StyledInputField
          type="email"
          name="email"
          value={email}
          onChange={setEmail}
          className="emailClass"
          placeholder="email"
        />
        <StyledInputField
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
          className="passwordClass"
          placeholder="password"
        />

        <Btn onClick={() => signIn('email', { email, callbackUrl: callbackUrl as string })}>Sign in with Email</Btn>
      </div>
      <Link href="/signupform" passHref={true}>
        <a>
          <StyledNextButton buttonLabel={'Next >'} />
        </a>
      </Link>
    </SignInPage>
  );
}

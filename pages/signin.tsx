import React from 'react';
import { getCsrfToken } from 'next-auth/react';
import { CtxOrReq } from 'next-auth/client/_utils';

import styled from 'styled-components';

const SignInPage = styled.div`
  overflow: hidden;
  background: black;
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

interface Props {
  csrfToken?: string;
}

export default function SignIn({ csrfToken }: Props) {
  return (
    <SignInPage>
      <Title> Please enter your email address.</Title>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input type="email" id="email" name="email" style={{ border: '1px solid grey' }} />
        <Btn type="submit">Sign in with Email</Btn>
      </form>
    </SignInPage>
  );
}

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

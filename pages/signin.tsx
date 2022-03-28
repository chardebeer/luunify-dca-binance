import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
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

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      if (err) {
        console.log('errerr', err);
      }
    };

    router.events.on('routeChangeError', handleRouteChangeError);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <SignInPage>
      <Title> Please enter your email address.</Title>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: '1px solid grey' }}
        />
        <Btn onClick={() => signIn('email', { email, callbackUrl: callbackUrl as string })}>Sign in with Email</Btn>
      </div>
    </SignInPage>
  );
}

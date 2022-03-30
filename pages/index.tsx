import { Box } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Jobs from '../components/Jobs';
import Portfolio from '../components/Portfolio';
import Settings from '../components/Settings';
import Subscriptions from '../components/Subscriptions';
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

const SubText = styled.div`
  color: lightgray;
  font-weight: bold;
  padding-bottom: calc(1rem + 5vh);
`;

const MessageText = styled.h1`
  color: #333;
  font-weight: bold;
`;

const Container = styled.div`
  background: lightGray;
  align-content: center;
  justify-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`;

export default function Index() {
  const { data: session, status } = useSession();
  const { user } = session || {};
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

  if (status === 'loading') return <p>Loading...</p>;

  if (!user) {
    return (
      <SignInPage>
        <Title>Welcome to Muunbot</Title>
        <br />
        <SubText>Please sign in or sign up to continue</SubText>
        <Btn onClick={() => signIn()} style={{ backgroundColor: 'lightGray' }}>
          Sign in
        </Btn>
        {/* <button onClick={() => signUp()}>Sign up</button> */}
      </SignInPage>
    );
  }

  function renderContent() {
    return (
      <Box
        as="main"
        d="grid"
        gridRowGap="20px"
        gridTemplateRows="auto 1fr"
        minH={['calc(100vh - 153.68px)', 'calc(100vh - 132.88px)']}
        px={[2, 5]}
        py={[2, 5]}
      >
        <Portfolio />
        <Jobs defaultTimezone={user.timezone || ''} />
      </Box>
    );
  }
  // new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  return (
    <ErrorBoundary>
      <Header
        onGlobalSettingsClick={() => setIsGeneralSettingsOpen(true)}
        onSubscriptionsClick={() => setIsSubscriptionsOpen(true)}
      />
      <Container>
        {user.binance?.apiKey && user.binance?.apiSecret && user.subscriptionUntil >= new Date() ? (
          renderContent()
        ) : (
          <Box>
            <Box>
              <MessageText>Binance api keys required</MessageText>
            </Box>
            <Box>
              <MessageText>Subscription required</MessageText>
            </Box>
          </Box>
        )}

        {isGeneralSettingsOpen && (
          <Settings
            initialValues={user}
            isOpen={isGeneralSettingsOpen}
            onClose={() => setIsGeneralSettingsOpen(false)}
          />
        )}

        {isSubscriptionsOpen && (
          <Subscriptions user={user} isOpen={isSubscriptionsOpen} onClose={() => setIsSubscriptionsOpen(false)} />
        )}
      </Container>
    </ErrorBoundary>
  );
}

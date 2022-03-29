import { Box } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Jobs from '../components/Jobs';
import Portfolio from '../components/Portfolio';
import Settings from '../components/Settings';
import styled from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Link from 'next/link';
import StyledLogo from '../styles/Logo.style';
import StyledButton from 'styles/Button.style';

const HomeContainer = styled.div`
  overflow: hidden;
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
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);

  if (status === 'loading') return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <HomeContainer>
        <GlobalStyles />
        <StyledLogo />
        <Title>Welcome to Muunbot</Title>
        <br />
        <SubText>Please sign in or sign up to continue</SubText>
        <StyledButton buttonLabel="Sign In" onClick={() => signIn()} />
        <Link href="/signupform">
          <StyledButton buttonLabel="Sign up" />
        </Link>

        {/* <button onClick={() => signUp()}>Sign up</button> */}
      </HomeContainer>
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
        <Jobs defaultTimezone={session?.user.timezone || ''} />
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Header onGlobalSettingsClick={() => setIsGeneralSettingsOpen(true)} />
      <Container>
        {session?.user.binance?.apiKey && session?.user.binance?.apiSecret ? (
          renderContent()
        ) : (
          <Box>
            <MessageText>Please add binance api keys in settings to continue</MessageText>
          </Box>
        )}
        {/* <Footer /> */}
        {isGeneralSettingsOpen && (
          <Settings
            initialValues={session.user}
            isOpen={isGeneralSettingsOpen}
            onClose={() => setIsGeneralSettingsOpen(false)}
          />
        )}
      </Container>
    </ErrorBoundary>
  );
}

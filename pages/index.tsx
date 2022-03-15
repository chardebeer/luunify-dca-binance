import { Box, Text } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Jobs from '../components/Jobs';
import Portfolio from '../components/Portfolio';
import Settings from '../components/Settings';

export default function Index() {
  const { data: session, status } = useSession();
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);

  if (status === 'loading') return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()} style={{ backgroundColor: 'lightGray' }}>
          Sign in
        </button>
        {/* <button onClick={() => signUp()}>Sign up</button> */}
      </>
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
      {session?.user.binance.apiKey && session?.user.binance.apiSecret ? (
        renderContent()
      ) : (
        <Box>
          <Text fontSize="xl">Please add binance api keys in settings to continue</Text>
        </Box>
      )}
      <Footer />
      {isGeneralSettingsOpen && (
        <Settings
          initialValues={session.user}
          isOpen={isGeneralSettingsOpen}
          onClose={() => setIsGeneralSettingsOpen(false)}
        />
      )}
    </ErrorBoundary>
  );
}

import { Box } from '@chakra-ui/react';
import { getSession, signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Jobs from '../components/Jobs';
import Portfolio from '../components/Portfolio';
import Settings from '../components/Settings';
import { User } from '../types';

export default function Index() {
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);
  const [userConfig, updateUserConfig] = useState();
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
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

  return (
    <ErrorBoundary>
      <Header onGlobalSettingsClick={() => setIsGeneralSettingsOpen(true)} />
      {/* <Box
        as="main"
        d="grid"
        gridRowGap="20px"
        gridTemplateRows="auto 1fr"
        minH={['calc(100vh - 153.68px)', 'calc(100vh - 132.88px)']}
        px={[2, 5]}
        py={[2, 5]}
      >
        <Portfolio />
        <Jobs defaultTimezone={userConfig.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone} />
      </Box>
      <Footer />
      {isGeneralSettingsOpen && (
        <Settings
          initialValues={userConfig}
          isOpen={isGeneralSettingsOpen}
          onClose={() => setIsGeneralSettingsOpen(false)}
          onUpdate={updateUserConfig}
        />
      )} */}
    </ErrorBoundary>
  );
}

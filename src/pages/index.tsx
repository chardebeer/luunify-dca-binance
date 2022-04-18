import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Header from 'src/components/Header';
import Jobs from 'src/components/Jobs';
import Portfolio from 'src/components/Portfolio';
import Settings from 'src/components/Settings';
import styled from 'styled-components';
import Welcome from 'src/components/Welcome';
import StyledSideNav from 'src/styles/SideNav.style';

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

const DashBoardContainer = styled.div`
  background: lightGray;
  display: flex;
  height: 100vh;
  width: 100wh;
  font-family: montserrat, arial;
`;

export default function Index() {
  const { data: session } = useSession();
  const { user } = session || {};
  const [selectedPage, setSelectedPage] = useState('settings');

  // return (
  //   <ErrorBoundary>
  //     <DashBoardContainer>
  //       <StyledSideNav selectedPage={selectedPage} setSelectedPage={(page) => setSelectedPage(page)} />

  //       {selectedPage === 'portfolio' && <Portfolio />}

  //       {selectedPage === 'jobs' && <Jobs defaultTimezone={user?.timezone || ''} />}

  //       {selectedPage === 'settings' && (
  //         <Settings
  //           user={{
  //             id: '',
  //             email: 'laclance@gmail.com',
  //             timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //             telegram: {
  //               botToken: '',
  //               chatId: '',
  //               enabled: false,
  //             },
  //             binance: {
  //               update: false,
  //             },
  //           }}
  //         />
  //       )}
  //     </DashBoardContainer>
  //   </ErrorBoundary>
  // );
  // new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  if (!user) return <Welcome />;

  const subscriptionActive = user.subscriptionUntil >= new Date();

  if (user.binance?.apiKey && user.binance?.apiSecret && !subscriptionActive) {
    return (
      // @ts-ignore
      <ErrorBoundary>
        <DashBoardContainer>
          <StyledSideNav selectedPage={selectedPage} setSelectedPage={(page) => setSelectedPage(page)} />
          {selectedPage === 'portfolio' && <Portfolio />}
          {selectedPage === 'settings' && <Settings user={user} />}
          {selectedPage === 'jobs' && <Jobs defaultTimezone={user?.timezone || ''} />}
        </DashBoardContainer>
      </ErrorBoundary>
    );
  }

  return (
    // @ts-ignore
    <ErrorBoundary>
      <Container>
        <Box>
          {(!user.binance?.apiKey || !user.binance?.apiSecret) && (
            <Box>
              <MessageText>Binance api keys required</MessageText>
            </Box>
          )}
          {!subscriptionActive && (
            <Box>
              <MessageText>Subscription required</MessageText>
            </Box>
          )}
        </Box>
      </Container>
    </ErrorBoundary>
  );
}

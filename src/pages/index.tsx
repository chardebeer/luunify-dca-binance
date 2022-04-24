import { Box } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Jobs from 'src/components/Jobs';
import Portfolio from 'src/components/Portfolio';
import Settings from 'src/components/Settings';
import styled from 'styled-components';
import StyledSideNav from 'src/styles/SideNav.style';
import Orders from 'src/components/Orders';

const HomeContainer = styled.div`
  background: lightGray;
  display: flex;
  height: 100vh;
  width: 100wh;
  font-family: montserrat, arial;
`;

export default function Index() {
  const { data: session } = useSession();
  const { user } = session || {};
  const subscriptionActive = user.subscriptionUntil >= new Date();
  const [selectedPage, setSelectedPage] = useState('settings');

  function switchPage(page: string) {
    if (user.binance?.apiKey && user.binance?.apiSecret && !subscriptionActive) {
      setSelectedPage(page);
    } else {
      let message = '';

      if (!user.binance?.apiKey || !user.binance?.apiSecret) message = 'Binance api keys required. ';

      if (!subscriptionActive) message += 'Subscription required.';

      alert(message);
    }
  }

  return (
    // @ts-ignore
    <ErrorBoundary>
      <HomeContainer>
        <StyledSideNav selectedPage={selectedPage} setSelectedPage={switchPage} />
        {selectedPage === 'portfolio' && <Portfolio />}
        {selectedPage === 'settings' && <Settings user={user} />}
        {selectedPage === 'jobs' && <Jobs defaultTimezone={user?.timezone || ''} />}
        {selectedPage === 'orders' && (
          <Orders defaultTimezone={user?.timezone || ''} navigateToJobs={() => setSelectedPage('jobs')} />
        )}
      </HomeContainer>
    </ErrorBoundary>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/welcome',
      },
    };
  }

  return { props: {} };
}

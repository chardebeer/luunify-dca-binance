import React, { ReactNode } from 'react';
import { User } from 'next-auth';
import StyledSideNav from 'src/styles/SideNav.style';
import ErrorBoundary from './ErrorBoundary';
import styled from 'styled-components';
import StyledTopNav from 'src/styles/TopNav.style';

const HomeContainer = styled.div`
  background: lightGray;
  display: flex;
  height: 100vh;
  width: 100wh;
  font-family: montserrat, arial;
`;

interface Props {
  user?: User;
  children: ReactNode;
}

export default function PageWrapper({ user, children }: Props) {
  return (
    // @ts-ignore
    <ErrorBoundary>
      <StyledTopNav />

      <HomeContainer>
        {/* @ts-ignore */}
        <StyledSideNav user={user} />
        {children}
      </HomeContainer>
    </ErrorBoundary>
  );
}

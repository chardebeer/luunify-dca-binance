import React from 'react';
import styled from 'styled-components';
import CalendarIcon from './icons/CalendarIcon';
import ActivityIcon from './icons/ActivityIcon';
import ChatIcon from './icons/ChatIcon';
import SearchBar from './SearchBar';
import ProfilePic from './ProfilePic';
import { BsChevronDown } from 'react-icons/bs';
import ExchangeActivity from './ExchangeActivity';

const StyledDiv = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  border-radius: 50%;
  border: none;
  height: 20px;
  width: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
  &:hover {
    background: linear-gradient(0deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
    color: white;
  }
`;

type Props = {
  className?: string;
  src?: string;
};

function TopNav({ className }: Props) {
  return (
    <StyledDiv className={className}>
      <SearchBar />
      <CalendarIcon />
      <ActivityIcon />
      <ChatIcon />
      <ProfilePic />
      <ExchangeActivity>
        <BsChevronDown size={15} />
      </ExchangeActivity>
      <span>|</span>
      <StyledButton>+</StyledButton>
    </StyledDiv>
  );
}

export default TopNav;

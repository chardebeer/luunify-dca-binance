import React from 'react';
import styled from 'styled-components';
import CalendarIcon from './icons/CalendarIcon';
import ActivityIcon from './icons/ActivityIcon';
import ChatIcon from './icons/ChatIcon';
import SearchBar from './SearchBar';
import ProfilePic from './ProfilePic';
import { BsChevronDown } from 'react-icons/bs';

const StyledProfilePic = styled(ProfilePic)`
  height: 10px;
  width: 10px;
  border-radius: 50px;
`;

const StyledProfilePicContainer = styled.div`
  width: 30px;
  border-radius: 50px;
  overflow: hidden;
`;

const StyledButton = styled.button`
  border-radius: 50%;
  border: none;
  height: 20px;
  width: 20px;
  color: white;
  background: linear-gradient(180deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
  &:hover {
    background: linear-gradient(0deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
    color: white;
  }
`;

type Props = {
  className?: string;
};

function TopNav({ className }: Props) {
  return (
    <div className={className}>
      <SearchBar />
      <CalendarIcon />
      <ActivityIcon />
      <ChatIcon />
      <StyledProfilePicContainer>
        <StyledProfilePic />
      </StyledProfilePicContainer>
      <BsChevronDown size={15} />
      <span>|</span>
      <StyledButton>+</StyledButton>
    </div>
  );
}

export default TopNav;

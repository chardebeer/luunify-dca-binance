import React from 'react';
import styled from 'styled-components';
import CalendarIcon from './icons/CalendarIcon';
import ActivityIcon from './icons/ActivityIcon';
import ChatIcon from './icons/ChatIcon';
import SearchBar from './SearchBar';
import ProfilePic from './ProfilePic';
import { BsChevronDown } from 'react-icons/bs';
import iconsrc from '../public/ProfilePic.jpg';

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
      <ProfilePic src={iconsrc} alt={'profile pic'} />
      <button>
        <BsChevronDown size={15} />
      </button>
      <span>|</span>
      <StyledButton>+</StyledButton>
    </div>
  );
}

export default TopNav;

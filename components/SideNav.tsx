import React from 'react';
import ContactsIcon from './icons/ContactsIcon';
import StyledSideNavButton from '../styles/SideNavButton.style';
import LoansIcon from './icons/LoansIcon';
import SettingsIcon from './icons/SettingsIcon';
import ShopListIcon from './icons/ShopListIcon';
import MarketIcon from './icons/MarketIcon';
import RecordsIcon from './icons/RecordsIcon';
import WalletsIcon from './icons/WalletsIcon';
import Logo from './Logo';

type Props = {
  className?: string;
  fill?: string;
};

function SideNav({ className, fill }: Props) {
  return (
    <div className={className}>
      <Logo />
      <StyledSideNavButton>
        <WalletsIcon fill={fill} />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <RecordsIcon fill={fill} />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <MarketIcon fill={fill} />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <LoansIcon fill={fill} />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <ContactsIcon />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <ShopListIcon fill={fill} />
      </StyledSideNavButton>
      <StyledSideNavButton>
        <SettingsIcon fill={fill} />
      </StyledSideNavButton>
    </div>
  );
}

export default SideNav;

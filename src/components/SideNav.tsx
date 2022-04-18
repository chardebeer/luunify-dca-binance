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
  selectedPage: string;
  setSelectedPage: (page: string) => void;
};

function SideNav({ className, fill, selectedPage, setSelectedPage }: Props) {
  return (
    <div className={className}>
      <StyledSideNavButton style={{ width: '100%', padding: '4px', marginBottom: '4px', backgroundColor: '#222' }}>
        <Logo />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <WalletsIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <RecordsIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => setSelectedPage('portfolio')} isSelected={selectedPage === 'portfolio'}>
        <MarketIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => setSelectedPage('jobs')} isSelected={selectedPage === 'jobs'}>
        <LoansIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <ContactsIcon />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <ShopListIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => setSelectedPage('settings')} isSelected={selectedPage === 'settings'}>
        <SettingsIcon fill={fill} />
      </StyledSideNavButton>
    </div>
  );
}

export default SideNav;

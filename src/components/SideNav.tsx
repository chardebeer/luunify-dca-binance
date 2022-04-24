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
import { useRouter } from 'next/router';
import { User } from 'types';

type Props = {
  className?: string;
  fill?: string;
  user?: User;
};

function SideNav({ className, fill, user }: Props) {
  const subscriptionActive = user?.subscriptionUntil && user.subscriptionUntil >= new Date();
  const router = useRouter();

  function switchPage(page: string) {
    if (user?.binance?.apiKey && user?.binance?.apiSecret && !subscriptionActive) {
      router.replace(page);
    } else {
      let message = '';
      if (!user?.binance?.apiKey || !user?.binance?.apiSecret) message = 'Binance api keys required. ';
      if (!subscriptionActive) message += 'Subscription required.';
      alert(message);
    }
  }

  return (
    <div className={className}>
      <StyledSideNavButton style={{ width: '100%', padding: '4px', marginBottom: '4px', backgroundColor: '#222' }}>
        <Logo />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <WalletsIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => switchPage('/jobs')} isSelected={router.pathname === '/jobs'}>
        <RecordsIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => switchPage('/portfolio')} isSelected={router.pathname === '/portfolio'}>
        <MarketIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => switchPage('/orders')} isSelected={router.pathname === '/orders'}>
        <LoansIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <ContactsIcon />
      </StyledSideNavButton>

      <StyledSideNavButton>
        <ShopListIcon fill={fill} />
      </StyledSideNavButton>

      <StyledSideNavButton onClick={() => switchPage('/')} isSelected={router.pathname === '/'}>
        <SettingsIcon fill={fill} />
      </StyledSideNavButton>
    </div>
  );
}

export default SideNav;

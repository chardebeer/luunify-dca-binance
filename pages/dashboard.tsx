import React from 'react';
import StyledSideNav from '../styles/SideNav.style';
import GlobalStyles from '../styles/GlobalStyles';
import DashBoardHeader from '../components/DashBoardHeader';
import StyledDashBoardContainer from '../styles/DashBoardContainer.style';
import StyledTopNav from '../styles/TopNav.style';
//import { StyledBalanceModal } from "../components/styles/BalanceModal.style";
//import { StyledGraphModal } from "../components/styles/GraphModal.style";
//import { StyledPortfolioBreakDownModal } from "../components/styles/PortfolioBreakDownModal.style";
//import { StyledNewsFeedModal } from "../components/styles/NewsFeedModal.style";

export default function Confirmationpopup() {
  return (
    <StyledDashBoardContainer>
      <GlobalStyles />

      <StyledSideNav />
      <StyledTopNav />
      <DashBoardHeader headerText={'DashBoard'} />
    </StyledDashBoardContainer>
  );
}

//headerText,
{
  /* <StyledBalanceModal
headerText={"Balance"}
walletTotal={"₿ 21.836"}
bitValue={"1 bit = $32,35"}
/>
<StyledGraphModal
headerText={"Graph"}
graphX={"x value"}
graphY={"y value"}
/>
<StyledPortfolioBreakDownModal headerText={"Portfolio Breakdown"} />
<StyledNewsFeedModal headerText={"NewsFeed"} /> */
}

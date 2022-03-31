import React from 'react';
import StyledSideNav from '../styles/SideNav.style';
import GlobalStyles from '../styles/GlobalStyles';
import DashBoardHeader from '../components/DashBoardHeader';
import StyledDashBoardContainer from '../styles/DashBoardContainer.style';
import StyledTopNav from '../styles/TopNav.style';
import StyledBalanceModal from '../styles/BalanceModal.style';
import GraphModal from 'components/GraphModal';
//import { StyledGraphModal } from "../components/styles/GraphModal.style";
//import { StyledPortfolioBreakDownModal } from "../components/styles/PortfolioBreakDownModal.style";
//import { StyledNewsFeedModal } from "../components/styles/NewsFeedModal.style";
import StyledDashBoardModal from '../styles/DashBoardModal.style';
import PieChartModal from 'components/PieChartModal';

export default function Confirmationpopup() {
  return (
    <StyledDashBoardContainer>
      <GlobalStyles />
      <StyledSideNav />
      <StyledTopNav />
      <DashBoardHeader headerText={'DashBoard'} />
      <StyledBalanceModal modalValue={21.836} modalHeading={'Balance'} modalText={'1 Bit = $32,35'} />
      <StyledDashBoardModal modalHeading={'Graph'}>
        <GraphModal />
      </StyledDashBoardModal>
      <StyledDashBoardModal modalHeading={'Portfolio Breakdown'}>
        <PieChartModal />
      </StyledDashBoardModal>
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
modalHeading: string;
  className?: string;
  modalText: string;
  modalValue: number;
<StyledGraphModal
headerText={"Graph"}
graphX={"x value"}
graphY={"y value"}
/>
<StyledPortfolioBreakDownModal headerText={"Portfolio Breakdown"} />
<StyledNewsFeedModal headerText={"NewsFeed"} /> */
}

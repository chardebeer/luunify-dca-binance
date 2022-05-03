import React from 'react';
import styled from 'styled-components';

type Props = {
  day?: string;
  className?: string;
  hasPurchased?: boolean;
};

interface Div {
  hasPurchased: boolean;
}

const StyledDayIcon = styled.div<Div>`
  color: white;
  height: 30px;
  width: 30px;
  align-text: center;
  display: flex;
  justify-content: space-evenly;
  margin: 5px;
  padding-top: 3px;
  background-color: ${(props) => (props.hasPurchased ? 'red' : 'white')};
`;

//  background: ${(props) => (props.hasPurchased ? 'red' : 'white')};
//color: ${(props) => (props.hasPurchased ? 'white' : 'red')};

function DayIcon({ className, day }: Props) {
  return (
    <StyledDayIcon hasPurchased className={className}>
      {day}
    </StyledDayIcon>
  );
}

export default DayIcon;

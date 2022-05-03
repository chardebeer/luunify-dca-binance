import React from 'react';
import styled from 'styled-components';

type Props = {
  day?: string;
  className?: string;
  hasPurchased?: boolean;
  style?: React.CSSProperties;
};

const StyledDayIcon = styled.li`
  border-radius: 10px;
  display: flex;
  width: 10px;
  height: 15px;
  margin: 15px;
  color: white;
  background: ${(props) => (props.hasPurchased ? 'red' : 'white')};
  color: ${(props) => (props.hasPurchased ? 'white' : 'red')};
`;

function DayIcon({ className, day, hasPurchased, style }: Props) {
  return (
    <StyledDayIcon style={style} className={className}>
      {day}
    </StyledDayIcon>
  );
}

export default DayIcon;

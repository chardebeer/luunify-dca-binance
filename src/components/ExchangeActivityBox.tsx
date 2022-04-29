import { Divider } from '@chakra-ui/react';
import React, { ReactNode, CSSProperties } from 'react';
import { AiFillCloseCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaBtc, FaEthereum } from 'react-icons/fa';
import { MdOutlineAutoGraph } from 'react-icons/md';
import styled from 'styled-components';

type Props = {
  heading?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  date?: string;
  info?: string;
  color?: string;
};

const StyledButton = styled.button`
  border-radius: 10px;
  border: none;
  width: 100px;
  margin: 10px;
  color: white;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
  &:hover {
    background: linear-gradient(0deg, hsl(180, 80%, 65%), hsl(255, 98%, 60%));
    color: white;
  }
`;

function ExchangeActivityBox({ info, date, className, style, heading, children }: Props) {
  return (
    <div className={className} style={style}>
      <h1>
        {heading}{' '}
        <span>
          <button>
            <AiFillCloseCircle size="20" />
          </button>
        </span>{' '}
      </h1>
      {children}

      <div className="exchangeInfo">
        <div className="iconHolder">
          <MdOutlineAutoGraph />
        </div>

        <h3 className="date">{date} </h3>
        <p className="info">{info}</p>
        <StyledButton>Check →</StyledButton>
        <Divider borderWidth="1px" borderColor="#777" />
      </div>
      <div className="exchangeInfo">
        <div className="iconHolder">
          <AiOutlineDollarCircle />
        </div>
        <h3 className="date">{date}</h3>
        <p className="info">{info}</p>
        <StyledButton>Check →</StyledButton>
        <Divider borderWidth="1px" borderColor="#777" />
      </div>
      <div className="exchangeInfo">
        <div className="iconHolder">
          <FaBtc />
        </div>
        <h3 className="date">{date}</h3>
        <p className="info">{info}</p>
        <StyledButton>Check →</StyledButton>
        <Divider borderWidth="1px" borderColor="#777" />
      </div>
      <div className="exchangeInfo">
        <div className="iconHolder">
          <FaEthereum />
        </div>
        <h3 className="date">{date}</h3>
        <p className="info">{info}</p>
        <StyledButton>Check →</StyledButton>
        <Divider borderWidth="1px" borderColor="#777" />
      </div>
      <div className="exchangeInfo">
        <div className="iconHolder">
          <FaEthereum />
        </div>
        <h3 className="date">{date}</h3>
        <p className="info">{info}</p>
        <StyledButton>Check →</StyledButton>
        <Divider borderWidth="1px" borderColor="#777" />
      </div>
    </div>
  );
}

export default ExchangeActivityBox;

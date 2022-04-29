import { Center, Divider, Spinner } from '@chakra-ui/react';
import React, { ReactNode, CSSProperties, useEffect, useState } from 'react';
import { AiFillCloseCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaBtc, FaEthereum } from 'react-icons/fa';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { useIsMounted } from 'src/client-utils';
import StyledDashBoardBox from 'src/styles/DashBoardBox.style';
import styled from 'styled-components';
import { Asset } from 'types';

type Props = {
  heading?: string;
  className?: string;
  style?: CSSProperties;
  date?: string;
  info?: string;
  color?: string;
  assets: Asset[];
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

function ExchangeActivityBox({ info, date, className, style, heading, assets }: Props) {
  const [data, setData] = useState<any[]>([]);
  const isMounted = useIsMounted();

  async function getData() {
    try {
      const currencies = assets.map((a) => a.symbol).join(',');
      const response = await fetch(`/api/news?currencies=${currencies}`);

      console.log(response);

      if (response.ok && isMounted()) {
        setData(await response.json());
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!data.length) getData();
    const timer = setInterval(getData, 31000);
    return () => clearInterval(timer);
  }, []);

  if (!data.length) {
    return (
      <StyledDashBoardBox heading="Graph">
        <Center height="100%">
          <Spinner />
        </Center>
      </StyledDashBoardBox>
    );
  }

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className={className} style={style}>
      <h1>
        Exchange Activity
        <span>
          <button
            style={{
              backgroundColor: 'white',
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              overflow: 'visible',
            }}
          >
            <AiFillCloseCircle size="20" />
          </button>
        </span>
      </h1>
      {data.map((d, i) => {
        return (
          <div className="exchangeInfo" key={i}>
            <div className="iconHolder">
              <MdOutlineAutoGraph />
            </div>

            <h3 className="date">{new Date(d.published_at).toLocaleDateString(undefined, options as any)}</h3>
            <p className="info">{d.title}</p>
            <StyledButton>Check →</StyledButton>
            <Divider borderWidth="1px" borderColor="#777" />
          </div>
        );
      })}
    </div>
  );
}

export default ExchangeActivityBox;

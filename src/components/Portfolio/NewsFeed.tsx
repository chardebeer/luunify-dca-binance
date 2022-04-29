import { Center, Link, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useIsMounted } from 'src/client-utils';
import StyledDashBoardBox from 'src/styles/DashBoardBox.style';
import { Asset } from 'types';

type Props = {
  assets: Asset[];
};

function NewsFeed({ assets }: Props) {
  const [data, setData] = useState<any[]>([]);
  const isMounted = useIsMounted();

  async function getData() {
    try {
      const currencies = assets.map((a) => a.symbol).join(',');
      const response = await fetch(`/api/news?currencies=${currencies}`);

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

  return (
    <StyledDashBoardBox heading="News" style={{ textAlign: 'left', marginLeft: 0 }}>
      <ul style={{ maxHeight: 200, width: 360, padding: 4, marginTop: 2, overflowY: 'scroll' }}>
        {data.map((d, i) => (
          <li
            style={{
              fontSize: 12,
              marginTop: 2,
              marginBottom: 4,
              paddingTop: 3,
              paddingBottom: 6,
              paddingLeft: 4,
              paddingRight: 2,
              borderBottom: '1px solid lightGray',
            }}
            key={i}
          >
            <span>{`${d.currencies.map((c) => c.code).join(', ')} ${d.kind} from: `}</span>

            <Link href={d.source.domain} color="blue" textDecoration="underline" cursor="pointer">
              {d.source.domain}
            </Link>

            <br />

            <span>{d.title}&nbsp;</span>

            <Link href={d.url} color="blue" textDecoration="underline" cursor="pointer">
              More
            </Link>
          </li>
        ))}
      </ul>
    </StyledDashBoardBox>
  );
}

export default React.memo(NewsFeed);

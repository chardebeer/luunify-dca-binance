import * as React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &: hover {
    background: lightblue;

    border-radius: 20px;
  }
`;

function ChatIcon(props) {
  return (
    <StyledButton>
      <svg width={33} height={33} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.25 0H3a2 2 0 0 0-2 2v8.273H.998v4.109l.074.076a.942.942 0 0 0-.072.36c0 .515.41.932.917.932a.9.9 0 0 0 .342-.067l.066.069L5.63 12.34h10.62a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-.155 2.249H3.155v9.377l1.437-1.5h11.503V2.249Zm6.499 5.24h.656a.75.75 0 0 1 .75.75v9.011a.75.75 0 0 1-.75.75H9.657a.75.75 0 0 1-.75-.75v-.75a.75.75 0 0 1 .75-.75h12.187V8.238a.75.75 0 0 1 .75-.75Z"
          fill="#222"
          fillOpacity={0.5}
        />
      </svg>
    </StyledButton>
  );
}

export default ChatIcon;

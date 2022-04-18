import React, { ReactNode, CSSProperties } from 'react';

type Props = {
  heading?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function DashBoardBox({ className, style, heading, children }: Props) {
  return (
    <div className={className} style={style}>
      <h1 style={{ alignSelf: 'flex-start', textAlign: 'left', marginTop: 5, marginLeft: 10 }}>{heading}</h1>
      {children}
    </div>
  );
}

export default DashBoardBox;

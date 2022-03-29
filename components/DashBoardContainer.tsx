import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

function DashBoardContainer({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

export default DashBoardContainer;

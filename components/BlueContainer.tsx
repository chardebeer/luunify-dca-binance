import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

function BlueContainer({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

export default BlueContainer;

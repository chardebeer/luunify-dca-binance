import React from 'react';

type Props = {
  headerText: string;
  className?: string;
};

export default function DashBoardHeader({ className, headerText }: Props) {
  return <h1 className={className}>{headerText}</h1>;
}

import React, { ReactNode } from 'react';

type Props = {
  buttonLabel?: string;
  className?: string;
  onClick?: (value: string) => void;
  children: ReactNode;
};

export default function SideNavButton({ className, onClick, children }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

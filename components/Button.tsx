import React from 'react';

type Props = {
  buttonLabel: string;
  className?: string;
  onClick?: (value: string) => void;
  type?: any;
};

export default function Button({ className, buttonLabel, type, onClick }: Props) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

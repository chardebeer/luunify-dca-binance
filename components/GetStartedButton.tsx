import React from 'react';

type Props = {
  buttonLabel: string;
  className?: string;
};

function GetStartedButton({ className, buttonLabel }: Props) {
  return <button className={className}>{buttonLabel}</button>;
}

export default GetStartedButton;

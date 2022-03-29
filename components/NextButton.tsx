import React from 'react';

type Props = {
  buttonLabel: string;
  className?: string;
};

function NextButton({ className, buttonLabel }: Props) {
  return <button className={className}>{buttonLabel}</button>;
}

export default NextButton;

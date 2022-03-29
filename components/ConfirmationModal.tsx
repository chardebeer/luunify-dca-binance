import React from 'react';
import StyledConfirmationIcon from './icons/ConfirmationIcon';
import StyledGetStartedButton from '../styles/GetStartedButton.style';
import Link from 'next/link';

type Props = {
  modalText: string;
  className?: string;
  modalText2?: string;
};

export default function ConfirmationModal({ className, modalText, modalText2 }: Props) {
  return (
    <div className={className}>
      <StyledConfirmationIcon />
      <h1>{modalText}</h1>
      <h5>{modalText2}</h5>
      <div></div>
      <Link href="/dashboard" passHref={true}>
        <a>
          <StyledGetStartedButton buttonLabel={'✓ Get Started'} />
        </a>
      </Link>
    </div>
  );
}

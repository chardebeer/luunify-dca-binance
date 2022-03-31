import React, { ReactNode } from 'react';

type Props = {
  modalHeading?: string;
  className?: string;
  modalText?: string;
  modalValue?: number;
  children: ReactNode;
};

function DashBoardModal({ className, modalHeading, children, modalText, modalValue }: Props) {
  return (
    <div className={className}>
      <h1>{modalHeading}</h1>
      {children}
    </div>
  );
}

export default DashBoardModal;

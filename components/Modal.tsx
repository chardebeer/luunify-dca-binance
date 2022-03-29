import React, { ReactNode } from 'react';

type Props = {
  modalHeading: string;
  className?: string;
  modalText: string;
  children: ReactNode;
};

function Modal({ className, modalHeading, modalText, children }: Props) {
  return (
    <div className={className}>
      <div></div>
      <h1>{modalHeading}</h1>
      <h5>{modalText}</h5>
      {children}
    </div>
  );
}

export default Modal;

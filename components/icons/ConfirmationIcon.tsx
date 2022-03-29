import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import iconsrc from '/public/confirmationicon.png';

const ImageHolder = styled.div`
  background: white;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  display: flex;
  margin: 10px auto;
  box-shadow: 1px 10px 10px #aaaaaa;
  align-items: center;
  position: relative;
  justify-content: center;
`;

export default function ConfirmationIcon() {
  return (
    <ImageHolder>
      <Image alt="Confirmation Icon" src={iconsrc} />
    </ImageHolder>
  );
}

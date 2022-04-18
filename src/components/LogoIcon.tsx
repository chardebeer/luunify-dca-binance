import Image from 'next/image';
import React from 'react';
import iconsrc from '../../public/muun-logo.ico';

export default function Logo() {
  return <Image alt="Logo PlaceHolder" src={iconsrc} />;
}

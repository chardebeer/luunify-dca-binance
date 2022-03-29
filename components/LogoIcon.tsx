import Image from 'next/image';
import React from 'react';
import iconsrc from '../public/Muunlogo.ico';

export default function Logo() {
  return <Image alt="Logo PlaceHolder" src={iconsrc} />;
}

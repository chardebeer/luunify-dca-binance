import Image from 'next/image';
import React from 'react';
import iconsrc from '../public/profilepic.jpg';

export default function ProfilePic() {
  return <Image alt="User Profile Pic" src={iconsrc} />;
}

import React from 'react';
import { Avatar } from '@chakra-ui/react';

type Props = {
  className?: string;
  src?: string;
  name?: string;
};

function ProfilePic({ name, src, className }: Props) {
  return <Avatar name={name} src={src} className={className} />;
}

export default ProfilePic;

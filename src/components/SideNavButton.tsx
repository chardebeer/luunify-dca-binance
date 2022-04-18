import { Box } from '@chakra-ui/react';
import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
  isSelected?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export default function SideNavButton({ className, style, isSelected, onClick, children }: Props) {
  return (
    <button
      className={className}
      style={{
        backgroundColor: isSelected ? '#232' : 'inherit',
        color: isSelected ? 'white' : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}

      {isSelected && (
        <Box
          background="linear-gradient(to top, #622ec3, #4d65db, #379aee, #13ccd7)"
          position="relative"
          height="80%"
          right={'-14px'}
          width="3px"
          borderRadius="5px"
        />
      )}
    </button>
  );
}

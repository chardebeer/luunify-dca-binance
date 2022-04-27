import React, { ReactNode } from 'react';
import { Fade, ScaleFade, Slide, SlideFade, Box, useDisclosure, Button } from '@chakra-ui/react';

type Props = {
  heading?: string;
  className?: string;
  children?: ReactNode;
  buttonIcon?: string;
};

function ExchangeActivity({ heading, className, children, buttonIcon }: Props) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button onClick={onToggle}>{children}</Button>
      <Fade in={isOpen}>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
          Fade
        </Box>
      </Fade>
    </>
  );
}
export default ExchangeActivity;

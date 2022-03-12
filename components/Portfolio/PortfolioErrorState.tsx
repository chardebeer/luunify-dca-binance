import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';

type Props = {
  onClick: () => Promise<void>;
};

export default function ErrorState({ onClick }: Props) {
  return (
    <Box bgColor="#FFF" border="1px solid #DADCE0" borderRadius="5px" maxW="400px" py={5}>
      <VStack spacing={4}>
        <Box maxW="280px" textAlign="center">
          <Text fontSize="3xl">Uh oh!</Text>
          <Text>We seem to have run into some trouble while retrieving your portfolio balance</Text>
        </Box>
        <Button colorScheme="black" onClick={onClick} type="button">
          Try again
        </Button>
      </VStack>
    </Box>
  );
}

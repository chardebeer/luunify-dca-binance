import { Flex, Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';

type Props = {
  onClick: () => Promise<void>;
};

export default function ErrorState({ onClick }: Props) {
  return (
    <Flex bgColor="#FFF" width="100%" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Box maxW="280px" textAlign="center">
          <Text fontSize="3xl">Uh oh!</Text>
          <Text>We seem to have run into some trouble while retrieving your portfolio balance</Text>
        </Box>

        <Button colorScheme="black" onClick={onClick} type="button">
          Try again
        </Button>
      </VStack>
    </Flex>
  );
}

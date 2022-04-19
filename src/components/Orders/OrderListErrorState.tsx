import { Box, Button, Flex, Img, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  onRetry: () => Promise<void>;
};

export default function OrderListErrorState({ onRetry }: Props) {
  return (
    <Flex align="center" direction="column" py={2.5}>
      <Box maxW="400px" mb="20px">
        <Img alt="" height="auto" maxW="100%" src="/error.png" />
      </Box>

      <Stack align="center" spacing={5}>
        <Text fontSize="24px" fontWeight="bold" textTransform="uppercase">
          Uh oh!
        </Text>

        <Text color="#36454F" maxW="300px" textAlign="center">
          We seem to have run into some trouble fetching your orders. Would you like to give it another try?
        </Text>

        <Button borderRadius="20px" colorScheme="black" isFullWidth maxW="200px" onClick={onRetry}>
          Try Again
        </Button>
      </Stack>
    </Flex>
  );
}

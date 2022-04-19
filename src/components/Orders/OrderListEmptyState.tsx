import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  onClick: () => void;
};

export default function OrderListEmptyState({ onClick }: Props) {
  return (
    <Flex align="center" direction="column" py={2.5}>
      <Stack align="center" spacing={5}>
        <Text fontSize="24px" fontWeight="bold" textTransform="uppercase">
          No orders found
        </Text>

        <Text color="#36454F" maxW="300px" textAlign="center">
          You do not have any orders yet. Would you like to add a new DCA now?
        </Text>

        <Button borderRadius="20px" colorScheme="black" isFullWidth maxW="200px" onClick={onClick}>
          Add DCA
        </Button>
      </Stack>
    </Flex>
  );
}

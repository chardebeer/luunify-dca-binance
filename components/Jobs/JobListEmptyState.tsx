import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  onClick: () => void;
};

export default function JobListEmptyState({ onClick }: Props) {
  return (
    <Flex align="center" direction="column" py={2.5}>
      <Stack align="center" spacing={5}>
        <Text fontSize="24px" fontWeight="bold" textTransform="uppercase">
          no jobs found
        </Text>
        <Text color="#36454F" maxW="300px" textAlign="center">
          You have not created any jobs yet. Would you like to add a new one now?
        </Text>
        <Button borderRadius="20px" colorScheme="black" isFullWidth maxW="200px" onClick={onClick}>
          Add Job
        </Button>
      </Stack>
    </Flex>
  );
}

import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
  return (
    <Stack
      align="center"
      as="footer"
      borderTop="1px solid #DADCE0"
      direction={['column', 'row']}
      justify={['center', 'space-between']}
      mx={[2, 5]}
      px={0}
      py={4}
      spacing={[2, null]}
    >
      <Text fontSize="14px">
        Designed and Created by <b>Luunify</b>
      </Text>
    </Stack>
  );
}

import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../types';

type Props = {
  onClose: () => void;
  user: User;
  isOpen: boolean;
};

export default function Subscriptions({ onClose, user, isOpen }: Props) {
  const subscriptionUntil = user.subscriptionUntil ? new Date(user.subscriptionUntil) : undefined;
  const [paymentUrl, setPaymentUrl] = useState('');
  const [pendingPayment, setPendingPayment] = useState(false);

  useEffect(() => {
    async function createCharge() {
      const res = await fetch(`/api/createCharge?email=${user.email}&subscription=${user.subscriptionUntil || ''}`);
      const data = await res.json();

      setPaymentUrl(data.hosted_url);
    }

    !paymentUrl?.length && createCharge();
  }, []);

  function getSubscriptionText() {
    if (pendingPayment) return 'Pending Payment';
    if (!subscriptionUntil) return 'No Active Subsciptions';

    return (
      (subscriptionUntil < new Date() ? 'Subsciption Expired At ' : 'Subsciptions Active Until ') +
      subscriptionUntil.toLocaleString()
    );
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={'2xl'}>
      <ModalOverlay />

      <ModalContent bgColor="#EEE">
        <Box borderBottom="1px solid #E2E8F0" bgColor="white">
          <ModalHeader>
            <Text color="gray.900" fontSize="lg" fontWeight="bold">
              Moonbot
            </Text>
            <Text color="gray.600" fontSize="sm">
              dca subscription
            </Text>
          </ModalHeader>
        </Box>

        <ModalCloseButton bgColor="black" textColor="white" borderRadius="full" borderWidth={0} />

        <ModalBody>
          <Center height="200px">
            <Text color="gray.800" fontSize="xl" fontWeight="bold">
              {getSubscriptionText()}
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter borderTop="1px solid #E2E8F0" mt="20px">
          <Stack spacing={2} width="100%" direction="row">
            <Button
              isFullWidth
              bgImage="linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)"
              textColor="white"
              borderRadius="2xl"
              boxShadow="xl"
              isLoading={!paymentUrl.length}
              onClick={() => {
                setPendingPayment(true);
                window.open(paymentUrl, '_blank')?.focus();
              }}
              disabled={pendingPayment}
            >
              Pay With Crypto
            </Button>

            <Button
              isFullWidth
              bgColor="white"
              textColor="blackAlpha.800"
              borderRadius="2xl"
              boxShadow="xl"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

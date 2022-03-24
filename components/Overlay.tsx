import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
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
import React from 'react';
import { useMediaQuery } from '../client-utils';
import styled from 'styled-components';

const OkBtn = styled.button`
  background-image: linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%);
  margin: 10px;
  padding: 15px 45px;
  align-self: center;
  justify-self: center;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 33px;
  display: block;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

type Props = {
  children: React.ReactNode;
  formId: string;
  footer?: React.ReactNode;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  subTitle?: string;
  title: string;
};

const Overlay = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, formId, footer, isLoading, isOpen, onClose, subTitle, title }, ref) => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    const footerContent = footer || (
      <Stack spacing={2} width="100%" direction="row">
        <Button
          isFullWidth
          bgImage="linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%)"
          textColor="white"
          borderRadius="2xl"
          boxShadow="xl"
          form={formId}
          isLoading={isLoading}
          ref={ref}
          type="submit"
        >
          Save
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
    );

    if (isMobile) {
      return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
          <DrawerOverlay />
          <DrawerContent>
            <Box borderBottom="1px solid #E2E8F0">
              <DrawerHeader>
                <Text color="gray.900" fontSize="lg" fontWeight="bold">
                  {title}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {subTitle}
                </Text>
              </DrawerHeader>
            </Box>
            <DrawerCloseButton />
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter borderTop="1px solid #E2E8F0" mt="20px">
              {footerContent}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bgColor="#EEE">
          <Box borderBottom="1px solid #E2E8F0" bgColor="white">
            <ModalHeader>
              <Text color="gray.900" fontSize="lg" fontWeight="bold">
                {title}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {subTitle}
              </Text>
            </ModalHeader>
          </Box>
          <ModalCloseButton bgColor="black" borderRadius="full" />
          <ModalBody>{children}</ModalBody>
          <ModalFooter borderTop="1px solid #E2E8F0" mt="20px">
            {footerContent}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);

Overlay.displayName = 'Overlay';

export default Overlay;

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

type Props = {
  children: React.ReactNode;
  formId: string;
  footer?: React.ReactNode;
  isLoading: boolean;
  hasError?: boolean;
  isOpen: boolean;
  onClose: () => void;
  subTitle?: string;
  title: string;
  size?: string;
};

const Overlay = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, formId, footer, isLoading, isOpen, onClose, subTitle, title, size, hasError }, ref) => {
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
          disabled={hasError}
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
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={size || '4xl'}>
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
          <ModalCloseButton bgColor="black" textColor="white" borderRadius="full" borderWidth={0} />
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
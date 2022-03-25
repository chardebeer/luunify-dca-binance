import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { MdLogout } from 'react-icons/md';
import { Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import { signOut } from 'next-auth/react';

type Props = {
  onGlobalSettingsClick: () => void;
};

export default function Header({ onGlobalSettingsClick }: Props) {
  return (
    <Flex
      align="center"
      as="header"
      bgColor="#333333"
      justify="space-between"
      left="0"
      position="sticky"
      px={[2, 5]}
      py={[2, 3]}
      shadow="rgb(0 0 0 / 25%) 0px 2px 2px 2px"
      top="0"
      zIndex={6}
    >
      <Logo />
      <Menu>
        <MenuButton
          aria-label="main menu"
          as={IconButton}
          icon={<HamburgerIcon boxSize="25px" color="#fff" />}
          minW="auto"
          variant="unstyled"
        />
        <MenuList>
          <MenuItem icon={<SettingsIcon />} onClick={onGlobalSettingsClick}>
            General settings
          </MenuItem>
          <MenuItem icon={<Icon as={MdLogout} />} onClick={() => signOut()}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

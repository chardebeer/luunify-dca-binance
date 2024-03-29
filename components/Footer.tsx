import {
  createIcon,
  Icon,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const TwitterIcon = createIcon({
  path: (
    <path fillRule="evenodd" clipRule="evenodd" d="M14.849 5.658a3.086 3.086 0 00-3.027 3.693 1 1 0 01-1.103 1.188 11.167 11.167 0 01-5.834-2.544c.031.602.24 1.242.693 1.912l.679 1.004-1.115.475-.215.092c.16.183.352.37.567.555a8.22 8.22 0 00.91.676l.011.007h.001l1.548.939-1.62.81c-.08.04-.16.076-.24.108a5.34 5.34 0 001.142.726l1.39.657-1.164 1.004c-.635.548-1.274.957-2.103 1.173A8.748 8.748 0 009.5 19.16c4.806 0 8.676-3.835 8.676-8.534v-.52l.425-.299c.664-.466 1.133-1.096 1.469-1.817h-2.16l-.272-.57a3.086 3.086 0 00-2.788-1.762zm-11.28 7.3a1 1 0 00-.237.797c.113.801.592 1.491 1.122 2.018.144.143.298.28.46.411l-.075.02c-.481.12-1.13.145-2.211.04a1 1 0 00-.813 1.694 10.716 10.716 0 007.684 3.222c5.713 0 10.399-4.436 10.664-10.034 1.29-1.083 1.935-2.55 2.283-3.883a1 1 0 00-.968-1.253h-2.353A5.086 5.086 0 009.78 8.329a9.214 9.214 0 01-4.721-2.975 1 1 0 00-1.673.23C2.78 6.906 2.664 8.43 3.34 9.98l-.234.1a1 1 0 00-.57 1.193c.186.652.604 1.228 1.032 1.685z" fill="#000" />
  ),
  viewBox: '0 0 24 24',
});

const GitHubIcon = createIcon({
  path: (
    <path fillRule="evenodd" clipRule="evenodd" d="M21 5.958c.009.607-.067 1.368-.134 1.923a4.163 4.163 0 0 1-.1.544C21.622 10.01 22 11.917 22 14c0 2.468-1.187 4.501-3.036 5.887C17.132 21.26 14.66 22 12 22c-2.66 0-5.132-.74-6.964-2.113C3.187 18.501 2 16.468 2 14c0-2.083.377-3.99 1.235-5.575a4.166 4.166 0 0 1-.1-.544C3.066 7.326 2.99 6.565 3 5.958c.01-.683.1-1.366.199-2.044.046-.314.118-.609.459-.795.348-.19.714-.12 1.075-.017 1.218.345 2.36.83 3.434 1.41C9.3 4.173 10.578 4 12 4c1.422 0 2.7.173 3.832.513a16.802 16.802 0 0 1 3.434-1.41c.361-.103.728-.174 1.075.016.34.186.413.481.46.795.098.678.188 1.361.198 2.044zM20 14c0-1.687-.388-4-2.5-4-.952 0-1.853.25-2.753.5-.899.25-1.797.5-2.747.5s-1.848-.25-2.747-.5c-.9-.25-1.8-.5-2.753-.5C4.394 10 4 12.32 4 14c0 1.764.827 3.231 2.236 4.287C7.66 19.356 9.69 20 12 20s4.339-.645 5.764-1.713C19.173 17.23 20 15.764 20 14zm-10 .5c0 1.38-.672 2.5-1.5 2.5S7 15.88 7 14.5 7.672 12 8.5 12s1.5 1.12 1.5 2.5zm5.5 2.5c.828 0 1.5-1.12 1.5-2.5s-.672-2.5-1.5-2.5-1.5 1.12-1.5 2.5.672 2.5 1.5 2.5z" fill="#000" />
  ),
  viewBox: '0 0 24 24',
});

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
      <Text
        fontSize="14px"
      >
        Designed and Created by
        {' '}
        <b>Luunify</b>
      </Text>
    </Stack>
  );
}

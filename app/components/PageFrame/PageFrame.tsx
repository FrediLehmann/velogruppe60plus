'use client';

import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Footer, Header } from './components';

export default function PageFrame({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" justify="space-between" minH="100vh">
      <Box>
        <Header />
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

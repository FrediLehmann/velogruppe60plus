'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Button, ButtonGroup, Container, Text } from '@chakra-ui/react';

import { Info, List } from '@/icons';
import { TrackClickEvent } from '@/components';

export default function Header() {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="gray.200"
      sx={{ '@media print': { display: 'none' } }}>
      <Container
        py="4"
        maxW="container.md"
        display="flex"
        flexDirection={['column', null, 'row']}
        alignItems={['flex-start', null, 'center']}
        justifyContent="space-between">
        <Link
          href="/"
          as={Text}
          fontSize={['xl', '2xl']}
          fontWeight="bold"
          _hover={{ textDecoration: 'none' }}>
          Velogruppe 60+ Sensetal
        </Link>
        <ButtonGroup
          size="md"
          variant="ghost"
          colorScheme="gray"
          spacing="2"
          mt={['4', null, '0']}>
          <TrackClickEvent
            event={{ name: 'NAVIGATE_TO_ALL_TOURS_BUTTON_CLICK' }}
            showBox={true}>
            <Button
              href="/alle-touren"
              as="a"
              leftIcon={<List boxSize={['4', '5']} />}>
              Touren
            </Button>
          </TrackClickEvent>
          <TrackClickEvent
            event={{ name: 'NAVIGATE_TO_INFO_BUTTON_CLICK' }}
            showBox={true}>
            <Button
              href="/info"
              as="a"
              leftIcon={<Info boxSize={['4', '5']} />}>
              Informationen
            </Button>
          </TrackClickEvent>
        </ButtonGroup>
      </Container>
    </Box>
  );
}

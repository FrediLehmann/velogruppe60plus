'use client';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { TrackClickEvent } from '@/app/components';
import { ArrowRight } from '@/icons';

export default function AdditionalInfos() {
  return (
    <Box>
      <Heading as="h2" size="md" color="green.800">
        Links
      </Heading>
      <Heading as="h2" size="lg" mb="3">
        Wo finde ich weitere Informationen?
      </Heading>
      <Flex flexDirection={['column', 'row']} gap={['2', '6']}>
        <TrackClickEvent event={{ name: 'ACCIDENT_PAGE_LINK_CLICK' }}>
          <Button
            href="/unfallverhalten"
            as={Link}
            rightIcon={<ArrowRight boxSize="5" />}>
            Unfallverhalten
          </Button>
        </TrackClickEvent>
        <TrackClickEvent event={{ name: 'EBIKE_PAGE_LINK_CLICK' }}>
          <Button
            href="/e-bikes"
            as={Link}
            rightIcon={<ArrowRight boxSize="5" />}>
            Gesetzliche Regelung E-Bikes
          </Button>
        </TrackClickEvent>
      </Flex>
    </Box>
  );
}

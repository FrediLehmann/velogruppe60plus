'use client';

import { Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { TrackClickEvent } from '@/components';
import { ArrowLeft } from '@/icons';

export default function BackToAllTours() {
  return (
    <TrackClickEvent event={{ name: 'BACK_TO_TOURS_LINK_CLICK' }}>
      <Button
        href="/alle-touren"
        as={Link}
        variant="link"
        color="green.700"
        leftIcon={<ArrowLeft />}
        py="6"
        sx={{ '@media print': { display: 'none' } }}>
        Zurück zu allen Touren
      </Button>
    </TrackClickEvent>
  );
}

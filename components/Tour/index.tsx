import { Button, Container, Heading, Link } from '@chakra-ui/react';
import { TourView, TrackClickEvent } from 'components';
import NextLink from 'next/link';
import { ArrowLeft } from 'icons';
import { useContext } from 'react';
import { TourContext } from '../../lib/contexts/TourContext';

const Tour = () => {
  const { tour } = useContext(TourContext);

  return (
    <Container as="main" maxW="container.md" mt={['4', '6', '12']}>
      <TrackClickEvent
        event={{ name: 'NAVIGATE_BACK_TO_ALL_TOURS_BUTTON_CLICK' }}>
        <NextLink href="/alle-touren" passHref legacyBehavior>
          <Button
            as={Link}
            mb="4"
            variant="link"
            color="green.700"
            alignItems="center"
            leftIcon={<ArrowLeft boxSize="5" />}>
            Zurück zu den Touren
          </Button>
        </NextLink>
      </TrackClickEvent>
      <Heading as="h1" fontSize={['xl', '2xl']}>
        {tour.name}
      </Heading>
      <TourView tour={tour} />
    </Container>
  );
};

export default Tour;

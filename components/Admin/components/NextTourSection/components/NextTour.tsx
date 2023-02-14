import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { Edit, Slash } from 'icons';
import { useMemo } from 'react';
import { TourDate } from '../TourDate';

const NextTour = ({ tour_date }: TourDate) => {
  const date = useMemo(() => {
    if (!tour_date) return;
    return new Intl.DateTimeFormat('de-ch', {
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(new Date(tour_date));
  }, [tour_date]);

  return (
    <Flex mt="6" mb="8" alignItems="center" justifyContent="space-between">
      <Box>
        <Text fontSize="sm" fontWeight="semibold">
          Nächste Tour:
        </Text>
        <Text fontSize="lg">{date}</Text>
      </Box>
      <ButtonGroup>
        <Button leftIcon={<Edit boxSize="5" />}>Ändern</Button>
        <Button leftIcon={<Slash boxSize="5" />}>Absagen</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default NextTour;

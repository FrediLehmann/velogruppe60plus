import { Heading, Skeleton, Text } from '@chakra-ui/react';
import { TourView } from 'components';
import { useContext } from 'react';
import { TourContext } from 'lib/contexts/TourContext';

const CurrentTour = () => {
  const { tour } = useContext(TourContext);

  if (!tour) return <Skeleton h="xl" w="full"></Skeleton>;

  return (
    <>
      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
        Aktuelle Tour
      </Text>
      <Heading as="h1" fontSize={['xl', '2xl']}>
        {tour.name}
      </Heading>
      <TourView tour={tour} />
    </>
  );
};

export default CurrentTour;

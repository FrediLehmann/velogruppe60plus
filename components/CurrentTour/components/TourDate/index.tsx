import { Box, Flex, Text } from '@chakra-ui/react';
import { TourContext } from 'lib/contexts/TourContext';
import { useContext, useMemo } from 'react';
import { TourCanceled } from './components';

const TourDate = () => {
  const { tourDate, tour } = useContext(TourContext);

  const date = useMemo(() => {
    if (!tourDate.tour_date) return;
    return new Intl.DateTimeFormat('de-ch', {
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(new Date(tourDate.tour_date));
  }, [tourDate.tour_date]);

  if (tourDate.is_canceled) return <TourCanceled tourDate={date} />;

  return (
    <Flex my="6" flexDirection={['column', 'row']} gap={['3', '6']}>
      <Box>
        <Text fontWeight="light" color="gray.700">
          Besammlung
        </Text>
        <Text fontSize={['md', 'lg']} fontWeight="bold">
          {date} Uhr
        </Text>
      </Box>
      <Flex gap="6" flexDirection="row">
        <Box>
          <Text fontWeight="light" color="gray.700">
            Treffpunkt
          </Text>
          <Text fontSize={['md', 'lg']} fontWeight="bold">
            {tour.startPoint}
          </Text>
        </Box>
        <Box>
          <Text fontWeight="light" color="gray.700">
            Tourdauer
          </Text>
          <Text fontSize={['md', 'lg']} fontWeight="bold">
            {tourDate.halfday_tour ? 'Halbtagestour' : 'Ganztagestour'}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TourDate;

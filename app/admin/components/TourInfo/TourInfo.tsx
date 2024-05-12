import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex
} from '@chakra-ui/react';

import { Tour } from '@/types/Tours.types';
import { TourView } from '@/components';

import { TourOperations } from './components';

export default function TourInfo(tour: Tour) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex
            align="center"
            flex="1"
            textAlign="left"
            fontSize="lg"
            fontWeight="semibold"
            gap="6">
            {tour.name}
            {tour.next_tour && (
              <Badge variant="outline" colorScheme="gray">
                Nächste Tour
              </Badge>
            )}
            {!tour.published && (
              <Badge variant="outline" colorScheme="blue">
                Nicht öffentlich
              </Badge>
            )}
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <TourOperations tour={tour} />
        <TourView tour={tour} />
      </AccordionPanel>
    </AccordionItem>
  );
}

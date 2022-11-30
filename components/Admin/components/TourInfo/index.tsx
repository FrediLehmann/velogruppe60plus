import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
} from "@chakra-ui/react";
import TourView from "components/TourView";
import { Tour } from "lib/types/Tours.types";
import { DeleteTour, EditTour, SetNextTour } from "./components";

const TourInfo = (tour: Tour) => {
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
            gap="6"
          >
            {tour.name}
            {tour.next_tour && (
              <Badge variant="outline" colorScheme="gray">
                Nächste Tour
              </Badge>
            )}
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <TourView tour={tour} />
        <Flex mt="6" gap="3" flexWrap="wrap">
          <EditTour {...tour} />
          <DeleteTour
            id={tour.id}
            name={tour.name}
            image={tour.image}
            disabled={tour.next_tour}
          />
          <SetNextTour id={tour.id} disabled={tour.next_tour} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default TourInfo;

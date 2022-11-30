import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { External } from "icons";
import { Fact } from "components";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Tour } from "lib/types/Tours.types";
import { DeleteTour, EditTour, SetNextTour } from "./components";

const TourInfo = (tour: Tour) => {
  const supabaseClient = useSupabaseClient();

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
        <Flex my={["6", "10"]} gap="8" flexDirection={["column", "row"]}>
          <Text fontSize={["lg", "xl"]}>{tour.description}</Text>
          <Flex gap={["6", "8"]} wrap="wrap">
            <Fact label="Distanz" value={tour.distance} />
            <Fact label="Aufstieg" value={tour.ascent} />
            <Fact label="Abstieg" value={tour.descent} />
            <Fact label="Dauer" value={tour.duration} />
            <Fact label="Start" value={tour.startPoint} />
            <Fact label="Ziel" value={tour.endPoint} />
            <Fact label="Kaffepause" value={tour.pause} />
          </Flex>
        </Flex>
        <NextLink href={tour.mapUrl} passHref legacyBehavior>
          <Link display="block" my="2" isExternal color="blue.700">
            Auf Schweiz Mobil anschauen <External mx="2px" boxSize="4" />
          </Link>
        </NextLink>
        <Image
          alt="Bild der Karte"
          src={
            supabaseClient.storage.from("map-images").getPublicUrl(tour.image)
              .data.publicUrl
          }
        />
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

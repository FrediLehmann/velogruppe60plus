import {
  Container,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
  Image,
} from "@chakra-ui/react";
import { Fact } from "components";
import NextLink from "next/link";
import { External } from "icons";
import { useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { TourContext } from "lib/contexts/TourContext";

const CurrentTour = () => {
  const supabaseClient = useSupabaseClient();
  const { tour } = useContext(TourContext);

  if (!tour)
    return (
      <Container as="main" maxW="container.md" mt={["4", "6", "12"]}>
        <Skeleton h="xl" w="full"></Skeleton>
      </Container>
    );

  return (
    <Container as="main" maxW="container.md" mt={["4", "6", "12"]}>
      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
        Aktuelle Tour
      </Text>
      <Heading as="h1" fontSize={["xl", "2xl"]}>
        {tour.name}
      </Heading>
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
        src={
          supabaseClient.storage.from("map-images").getPublicUrl(tour.image)
            .data.publicUrl
        }
        alt="Bild der Karte"
        borderRadius="sm"
      />
    </Container>
  );
};

export default CurrentTour;

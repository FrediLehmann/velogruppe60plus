import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Fact } from "components";
import NextLink from "next/link";
import { ArrowLeft, External } from "icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext } from "react";
import { TourContext } from "../../lib/contexts/TourContext";

const Tour = () => {
  const supabaseClient = useSupabaseClient();
  const { tour } = useContext(TourContext);

  return (
    <Container as="main" maxW="container.md" mt={["4", "6", "12"]}>
      <NextLink href="alle-touren" passHref legacyBehavior>
        <Button
          as={Link}
          mb="4"
          variant="link"
          color="blue.700"
          alignItems="center"
          leftIcon={<ArrowLeft boxSize="5" />}
        >
          Zurück zu den Touren
        </Button>
      </NextLink>
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
      />
    </Container>
  );
};

export default Tour;

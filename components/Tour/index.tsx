import {
  Container,
  Flex,
  Heading,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Fact } from "components";
import NextLink from "next/link";
import { External } from "icons";
import Image from "next/image";
import MapImage from "./images/map.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { Tour as TourType } from "lib/tours.type";

const Tour = () => {
  const [tour, setTour] = useState<TourType>();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const loadTour = async () => {
      const { data } = await supabaseClient
        .from("touren")
        .select(
          "id, name, description, mapUrl, startPoint, endPoint, pause, distance, ascent, descent, duration, next_tour"
        )
        .eq("next_tour", true)
        .single();

      if (data) setTour(data);
    };

    loadTour();
  }, [supabaseClient]);

  if (!tour) return <Skeleton></Skeleton>;
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
      <Image src={MapImage} alt="Karte" />
    </Container>
  );
};

export default Tour;

import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Fact } from "components";
import NextLink from "next/link";
import { External } from "icons";
import Image from "next/image";
import MapImage from "./images/map.png";

const Tour = () => {
  return (
    <Container as="main" maxW="container.md" mt={["4", "6", "12"]}>
      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
        Aktuelle Tour
      </Text>
      <Heading as="h1" fontSize={["xl", "2xl"]}>
        Tour 011: Kerzers
      </Heading>
      <Flex my={["6", "10"]} gap="8" flexDirection={["column", "row"]}>
        <Text fontSize={["lg", "xl"]}>
          Die Tour führt nach Laupen über den Auriedstäg weiter nach Kerzers bis
          zur Hasenholz Hütte und zurück über Wileroltigen nach Laupen.
        </Text>
        <Flex gap={["6", "8"]} wrap="wrap">
          <Fact label="Distanz" value="48 km" />
          <Fact label="Aufstieg" value="506 m" />
          <Fact label="Abstieg" value="607 m" />
          <Fact label="Dauer" value="3 Std." />
          <Fact label="Start" value="Restaurant Mühletal" />
          <Fact label="Ziel" value="Güüge-Velo Laupen" />
          <Fact
            label="Kaffepause"
            value="Restaurant Trubehöfli, Kriechenwil, +41315051115"
          />
        </Flex>
      </Flex>
      <NextLink
        href="https://map.schweizmobil.ch/?lang=de&photos=no&logo=no&detours=no&season=summer&bgLayer=pk&resolution=15.41&E=2583432&N=1199574&trackId=1295801641&3d_enabled=true&3d_lon=7.21459&3d_lat=46.90739&3d_elevation=13928&3d_heading=360.000&3d_pitch=-72.688"
        passHref
        legacyBehavior
      >
        <Link display="block" my="2" isExternal color="blue.700">
          Auf Schweiz Mobil anschauen <External mx="2px" boxSize="4" />
        </Link>
      </NextLink>
      <Image src={MapImage} alt="Karte" />
    </Container>
  );
};

export default Tour;

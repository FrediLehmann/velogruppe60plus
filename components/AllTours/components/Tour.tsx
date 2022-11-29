import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Tour } from "lib/types/tours.types";
import NextLink from "next/link";

const Tour = ({ id, name, distance, duration, image }: Tour) => {
  const supabaseClient = useSupabaseClient();

  return (
    <LinkBox
      as="article"
      display="flex"
      alignItems="center"
      gap="6"
      pr="16"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{ bg: "gray.100" }}
    >
      <Image
        borderRadius="md"
        alt="Bild der Karte"
        boxSize="100px"
        src={
          supabaseClient.storage.from("map-images").getPublicUrl(image).data
            .publicUrl
        }
      />
      <Box>
        <Heading as="h2" pb="2" fontSize={["lg", "xl"]}>
          <NextLink href={`tour/${id}`} passHref legacyBehavior>
            <LinkOverlay>{name}</LinkOverlay>
          </NextLink>
        </Heading>
        <Flex gap="1" fontSize={["sm", "md"]}>
          <Text fontWeight="light">Dauer:</Text>
          <Text fontWeight="semibold">{duration}</Text>
        </Flex>
      </Box>
    </LinkBox>
  );
};

export default Tour;

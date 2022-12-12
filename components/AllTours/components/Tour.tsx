import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ImageFallback } from 'components';
import { Tour } from 'types/Tours.types';
import NextLink from 'next/link';

const Tour = ({
  id,
  name,
  ascent,
  descent,
  description,
  distance,
  duration,
  image,
  next_tour
}: Tour) => {
  const supabaseClient = useSupabaseClient();

  return (
    <LinkBox
      as="article"
      bg="gray.100"
      borderRadius="sm"
      py={['3', '4']}
      px={['3', '4']}
      _hover={{ bg: 'gray.200' }}>
      <Flex gap="6" justify="space-between">
        <Box>
          <Heading as="h2" pb="2" fontSize={['lg', 'xl']}>
            <NextLink href={`tour/${id}`} passHref legacyBehavior>
              <LinkOverlay>{name}</LinkOverlay>
            </NextLink>
          </Heading>
          {next_tour && (
            <Badge variant="outline" colorScheme="gray" mt="1" mb="2">
              Aktuelle Tour
            </Badge>
          )}
          <Text noOfLines={next_tour ? 2 : 3}>{description}</Text>
        </Box>
        <Image
          borderRadius="sm"
          alt="Bild der Karte"
          boxSize="100px"
          fallback={<ImageFallback height="100px" width="100px" />}
          src={
            supabaseClient.storage.from('map-images').getPublicUrl(image).data
              .publicUrl
          }
        />
      </Flex>
      <Flex wrap="wrap" gap="4" mt="2">
        <Flex align="center" gap="1" fontSize={['sm', 'md']}>
          <Text fontWeight="light">Dauer:</Text>
          <Text fontWeight="semibold">{duration}</Text>
        </Flex>
        <Flex align="center" gap="1" fontSize={['sm', 'md']}>
          <Text fontWeight="light">Distanz:</Text>
          <Text fontWeight="semibold">{distance}</Text>
        </Flex>
        <Flex align="center" gap="1" fontSize={['sm', 'md']}>
          <Text fontWeight="light">Aufstieg:</Text>
          <Text fontWeight="semibold">{ascent}</Text>
        </Flex>
        <Flex align="center" gap="1" fontSize={['sm', 'md']}>
          <Text fontWeight="light">Abstieg:</Text>
          <Text fontWeight="semibold">{descent}</Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default Tour;

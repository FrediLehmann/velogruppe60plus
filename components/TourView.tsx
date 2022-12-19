import { Flex, Link, Image, Text, Box, Heading } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Fact, ImageFallback } from 'components';
import { External } from 'icons';
import NextLink from 'next/link';
import { Tour } from 'types/Tours.types';

const TourView = ({ tour }: { tour: Tour }) => {
  const supabaseClient = useSupabaseClient();

  return (
    <>
      <Flex
        my={['6', '10']}
        gap="8"
        flexDirection={['column', 'row']}
        align="flex-start">
        <Box>
          <Text fontSize={['lg', 'xl']} whiteSpace="pre-wrap" mb="4">
            {tour.description}
          </Text>
          {tour.route && (
            <>
              <Heading as="span" size="sm">
                Wegbeschreibung:
              </Heading>
              <Text fontSize={['lg', 'xl']} whiteSpace="pre-wrap">
                {tour.route}
              </Text>
            </>
          )}
        </Box>
        <Flex gap={['6', '8']} wrap="wrap" minW="40">
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
        fallback={<ImageFallback height="2xl" />}
        src={
          supabaseClient.storage.from('map-images').getPublicUrl(tour.image)
            .data.publicUrl
        }
        alt="Bild der Karte"
        borderRadius="sm"
      />
    </>
  );
};

export default TourView;

import { Flex, Link, Text, Box, Heading, AspectRatio } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Fact } from './components';
import { External } from 'icons';
import NextLink from 'next/link';
import { Tour } from 'types/Tours.types';
import Image from 'next/image';

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
          <Fact label="Kaffeepause" value={tour.pause} />
        </Flex>
      </Flex>
      <NextLink href={tour.mapUrl} passHref legacyBehavior>
        <Link display="block" my="2" isExternal color="green.700">
          Auf Schweiz Mobil anschauen <External mx="2px" boxSize="4" />
        </Link>
      </NextLink>
      <AspectRatio
        maxW="736px"
        ratio={tour.image_data.width / tour.image_data.height}
        borderRadius="sm">
        <Image
          src={
            supabaseClient.storage
              .from('map-images')
              .getPublicUrl(tour.image_data.path).data.publicUrl
          }
          priority
          fill
          sizes="(min-width: 768px) 736px, 100vw"
          alt="Bild der Karte"
        />
      </AspectRatio>
    </>
  );
};

export default TourView;

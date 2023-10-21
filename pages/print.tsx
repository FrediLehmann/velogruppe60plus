import Head from 'next/head';
import { Tour } from 'types/Tours.types';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import { ArrowLeft, Print as PrintIcon } from 'icons';
import NextLink from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { TrackClickEvent } from 'components';

export const getStaticProps = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { error, data } = await supabase
    .from('touren')
    .select('id, name, description, route, mapUrl, startPoint, endPoint')
    .eq('published', true)
    .order('name');

  if (error) throw error;

  return {
    props: {
      tours: data
    }
  };
};

const Print = ({ tours }: { tours: Tour[] }) => {
  const printPage = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Drucken</title>
        <meta name="robots" content="noindex"></meta>
        <meta name="description" content="Seite optimiert für den Drucker." />
      </Head>
      <Container
        maxW="container.md"
        my="8"
        sx={{ '@media print': { mt: '4' } }}>
        <TrackClickEvent event={{ name: 'BACK_TO_TOURS_LINK_CLICK' }}>
          <NextLink href="/alle-touren" passHref legacyBehavior>
            <Button
              as={Link}
              variant="link"
              color="green.700"
              leftIcon={<ArrowLeft />}
              py="6"
              sx={{ '@media print': { display: 'none' } }}>
              Zurück zu allen Touren
            </Button>
          </NextLink>
        </TrackClickEvent>
        <Flex as="header" justifyContent="space-between" align="center">
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.700">
              Alle Touren
            </Text>
            <Heading as="h1" size="lg" mb="6">
              Velogruppe 60+ Sensetal
            </Heading>
          </Box>
          <TrackClickEvent event={{ name: 'PRINT_TOURS_BUTTON_CLICK' }}>
            <Button
              leftIcon={<PrintIcon boxSize="5" />}
              onClick={printPage}
              sx={{ '@media print': { display: 'none' } }}>
              Jetzt Drucken
            </Button>
          </TrackClickEvent>
        </Flex>
        <Box as="main">
          {tours.map(tour => (
            <Box as="article" key={tour.id} py="3">
              <Box as="header">
                <Heading as="h2" size="md" my="4">
                  {tour.name}
                </Heading>
              </Box>
              <Box as="main">
                <Flex wrap="wrap" gap="4" my="2">
                  <Flex align="center" gap="1" fontSize={['sm', 'md']}>
                    <Text fontWeight="light">Startort:</Text>
                    <Text fontWeight="semibold">{tour.startPoint}</Text>
                  </Flex>
                  <Flex align="center" gap="1" fontSize={['sm', 'md']}>
                    <Text fontWeight="light">Zielort:</Text>
                    <Text fontWeight="semibold">{tour.endPoint}</Text>
                  </Flex>
                </Flex>
                <Box>
                  <Heading as="span" size="sm">
                    Wegbeschreibung:
                  </Heading>
                  <Text>{tour.route}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Print;

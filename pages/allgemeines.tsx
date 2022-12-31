import {
  Box,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import { PageFrame } from 'components';
import Head from 'next/head';
import NextLink from 'next/link';

const Information = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Allgemeines</title>
      </Head>
      <PageFrame>
        <Container maxW="container.md" mt={['4', '6', '12']} pb="8">
          <Box as="section">
            <Heading as="h2" mb="4" size="lg">
              Vorwort
            </Heading>
            <Text>
              Noch sind wir mitten im Winter, doch freuen wir uns jetzt bereits
              auf die Zeit, wo Velofahren wieder zum Genuss wird.
            </Text>
            <Text>
              Eine Teilnahme an den Ausflügen der Velogruppe60plus Sensetal wird
              sich lohnen.
            </Text>
            <Text>
              Dank der E-Bikes ist ein Mitmachen für viele Leute möglich.
              Personen über 60 plus, die Lust verspüren in dieser Gruppe
              mitzumachen, erhalten bei Paul Lehmann ESA-Leiter, Peter Poffet
              oder Arthur Schneuwly ESA-Leiter, weitere Auskünfte.
            </Text>
            <NextLink href="/alle-touren" passHref legacyBehavior>
              <Link>Zu den Touren</Link>
            </NextLink>
          </Box>
          <Box as="section">
            <Heading as="h1" mb="4" mt="8" size="lg">
              Allgemein
            </Heading>
            <Text>Es ist nie zu spät mit Sport anzufangen.</Text>
            <Text>
              Weder das Alter noch die Jahreszeit oder andere Faktoren sollten
              ein ernsthaftes Hindernis sein. Kaum eine Sportart ist so ideal
              für das Alter geeignet wie das Velofahren. Man steigert nicht nur
              die Ausdauer, Kraft und Schnelligkeit, sondern man bleibt auch
              geistig fit. Immer am Mittwoch wird eine Tour durchgeführt.
              Abwechslungsweise wird eine Halbtagestour von 35 bis 50 km oder
              eine Ganztagestour von 60 bis 70 km angeboten. Der genaue
              Zeitpunkt der nächsten Touren kann jeweils auf dieser Homepage und
              in den Freiburger- Nachrichten entnommen werden.
            </Text>
          </Box>
          <Box as="section">
            <Heading as="h2" mb="4" mt="8" size="lg">
              Velofahren
            </Heading>
            <UnorderedList>
              <ListItem>regt zu sportlicher Leistung an</ListItem>
              <ListItem>
                lehrt uns Natur und Kultur erleben und geniessen
              </ListItem>
              <ListItem>Neue Gegenden kennenlernen</ListItem>
              <ListItem>fördert soziale Kontakte</ListItem>
              <ListItem>
                stärkt die Lungen, regt Herz und Kreislauf an, aktiviert den
                Stoffwechsel, kräftigt die Muskeln, schont dabei die Gelenke.
              </ListItem>
            </UnorderedList>
          </Box>
        </Container>
      </PageFrame>
    </>
  );
};

export default Information;

import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import { Organisers, PageFrame } from 'components';
import Head from 'next/head';

const Information = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Allgemeines</title>
        <meta
          name="description"
          content="Das Programm umfasst Touren mit verschiedenen Distanzen, Halb- und
          Tagestouren. Wir werden auch interessante Sehenswürdigkeiten
          entlang der Strecke besuchen und uns Zeit nehmen, um die Schönheit
          der Natur zu genießen. Neben der Verbesserung der körperlichen
          Fitness bieten die Touren auch die Gelegenheit, die Landschaft der
          Region auf eine aufregende und umweltfreundliche Art und Weise zu
          erkunden."
        />
      </Head>
      <PageFrame>
        <Container maxW="container.md" mt={['4', '6', '12']} pb="8">
          <Organisers />
        </Container>
      </PageFrame>
    </>
  );
};

export default Information;

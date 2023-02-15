import { Container } from '@chakra-ui/react';
import {
  AdditionalInfos,
  Organisers,
  PageFrame,
  RulesOfConduct,
  TourInfo
} from 'components';
import Head from 'next/head';

const Information = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Informationen</title>
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
        <Container
          as="main"
          maxW="container.md"
          mt={['6', '12']}
          pb="12"
          display="flex"
          flexDirection="column"
          gap={['12', '16', '24']}>
          <TourInfo />
          <Organisers />
          <RulesOfConduct />
          <AdditionalInfos />
        </Container>
      </PageFrame>
    </>
  );
};

export default Information;

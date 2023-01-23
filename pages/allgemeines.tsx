import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import { PageFrame } from 'components';
import Head from 'next/head';

const Information = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Allgemeines</title>
        <meta
          name="description"
          content="In diesem Jahr bieten wir eine
          Reihe von Touren durch die wunderschöne Landschaft der Region an.
          Das Programm umfasst Touren mit verschiedenen Distanzen, Halb- und
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
          <Box>
            <Text>
              Liebe Kolleginnen und Kollegen der Velogruppe60plus-Sensetal, wir
              freuen uns, Ihnen das Jahresprogramm für unsere eBike Touren im
              Sensetal für 2023 vorzustellen. In diesem Jahr bieten wir eine
              Reihe von Touren durch die wunderschöne Landschaft der Region an.
              Das Programm umfasst Touren mit verschiedenen Distanzen, Halb- und
              Tagestouren. Wir werden auch interessante Sehenswürdigkeiten
              entlang der Strecke besuchen und uns Zeit nehmen, um die Schönheit
              der Natur zu genießen. Neben der Verbesserung der körperlichen
              Fitness bieten die Touren auch die Gelegenheit, die Landschaft der
              Region auf eine aufregende und umweltfreundliche Art und Weise zu
              erkunden.
            </Text>
            <Text mt="2">
              Wir freuen uns darauf, Sie bei unseren eBike Touren im Sensetal
              und Umgebung begrüßen zu dürfen! Mit freundlichen Grüßen, Paul,
              Peter und Arthur Velogruppe60plus Sensetal
            </Text>
          </Box>
          <Box as="section">
            <Heading as="h2" mt="8" mb="4" size="lg">
              Vorwort
            </Heading>
            <Text mb="3">
              Es ist schön, dass Sie sich auf die kommende Velofahr-Saison
              freuen und die Möglichkeit nutzen möchten, an den Ausflügen der
              Velogruppe60plus Sensetal teilzunehmen. Dank der E-Bikes ist es
              möglich, dass viele Menschen an den Touren teilnehmen können, auch
              wenn sie nicht mehr die jüngsten sind. Wenn Sie Interesse an einer
              Teilnahme haben und über 60 Jahre alt sind, können Sie sich bei
              Paul Lehmann, Peter Poffet oder Arthur Schneuwly, unter der
              E-Mail-Adresse{' '}
              <Link href="mailto:velogruppe60plus-sensetal@bluewin.ch" color="green.500">
                velogruppe60plus-sensetal@bluewin.ch
              </Link>{' '}
              für weitere Informationen und Auskünfte melden. Ich wünsche Ihnen
              viel Spaß und Freude bei den zukünftigen Ausflügen!
            </Text>
          </Box>
          <Box as="section">
            <Heading as="h1" mb="4" mt="8" size="lg">
              Allgemein
            </Heading>
            <Text>
              Es ist wichtig, sich regelmäßig körperlich zu betätigen, um fit
              und gesund zu bleiben. Es ist nie zu spät, mit Sport anzufangen,
              und weder das Alter noch die Jahreszeit oder andere Faktoren
              sollten ein ernsthaftes Hindernis darstellen. Velofahren ist eine
              Sportart, die besonders gut für das Alter geeignet ist, da sie die
              Ausdauer, Kraft und Schnelligkeit verbessert und gleichzeitig die
              geistige Fitness fördert. Die Velogruppe60plus Sensetal bietet
              wöchentlich am Mittwoch entweder Halbtagestouren von 35 bis 50 km
              oder Ganztagestouren von 60 bis 70 km an. Die genauen Zeitpunkte
              der nächsten Touren können auf der Homepage der Gruppe{' '}
              <Link
                href="https://www.velogruppe60plus-sensetal.ch"
                color="green.500">
                https://www.velogruppe60plus-sensetal.ch
              </Link>{' '}
              und in den &quot;Freiburger-Nachrichten&quot; entnommen werden.
              Ich wünsche Ihnen viel Spaß bei den kommenden Velotouren!
            </Text>
          </Box>
          <Box as="section">
            <Heading as="h2" mb="4" mt="8" size="lg">
              Velofahren
            </Heading>
            <Text>
              Velofahren ist eine Sportart, die zu sportlicher Leistung anregt
              und dabei gleichzeitig die Möglichkeit bietet, Natur und Kultur zu
              erleben und zu genießen. Sie können auf Velotouren neue Gegenden
              kennenlernen und soziale Kontakte knüpfen. Das Velofahren hat auch
              viele gesundheitliche Vorteile. Es stärkt die Lungen, regt das
              Herz und den Kreislauf an, aktiviert den Stoffwechsel und kräftigt
              die Muskeln. Dabei werden die Gelenke geschont, da das Velofahren
              eine niedrigere Belastung für die Gelenke darstellt als zum
              Beispiel Joggen. All diese Faktoren tragen dazu bei, dass das
              Velofahren eine gesunde und spaßige Sportart ist.
            </Text>
          </Box>
        </Container>
      </PageFrame>
    </>
  );
};

export default Information;

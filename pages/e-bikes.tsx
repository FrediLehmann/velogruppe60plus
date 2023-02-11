import {
  Container,
  Heading,
  ListItem,
  OrderedList,
  Text
} from '@chakra-ui/react';
import { PageFrame } from 'components';
import Head from 'next/head';

const Unfallverhlaten = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Unfallverhalten</title>
        <meta
          name="description"
          content="Im Falle eines Unfalls mit einem eBike gibt es einige wichtige Schritte, die Sie beachten sollten"
        />
      </Head>
      <PageFrame>
        <Container as="main" maxW="container.md" mt={['6', '12']} pb="12">
          <Heading as="h2" size="lg" mt="8" mb="4">
            Gesetzliche Regeln für E-Bikes
          </Heading>
          <Text>
            In der Schweiz gelten für das Fahren von E-Bikes einige gesetzliche
            Regeln, die es zu beachten gilt. Hier sind einige wichtige Punkte:
          </Text>
          <OrderedList my="4" px="6">
            <ListItem>
              E-Bikes müssen mit fest angebrachter Beleuchtung ausgestattet
              sein, die nach vorne und nach hinten strahlt. Zusätzlich sind
              Rückstrahler erforderlich, um von hinten gesehen zu werden.
            </ListItem>
            <ListItem>
              Seit dem 1. April 2022 müssen E-Bikes tagsüber mit eingeschaltetem
              Licht fahren.
            </ListItem>
            <ListItem>
              Eine Geschwindigkeitsübertretung kann mit einer Busse von 30
              Franken geahndet werden. Dies gilt, wenn die tatsächliche
              Geschwindigkeit nach Abzug der festgelegten Geräte- oder
              Messunsicherheit überschritten wird.
            </ListItem>
            <ListItem>
              Jedes E-Bike muss mit einer Veloglocke ausgestattet sein.
            </ListItem>
            <ListItem>
              Das Tragen eines Velohelms ist nur für das Lenken von schnellen
              E-Bikes Pflicht. Es wird jedoch allgemein empfohlen, auch beim
              Fahren von E-Bikes einen Helm zu tragen, um sich im Falle eines
              Unfalls zu schützen.
            </ListItem>
          </OrderedList>
          <Text>
            Es ist wichtig, dass Tourteilnehmer diese Regeln beachten, um sicher
            und rechtlich korrekt unterwegs zu sein. Es empfiehlt sich, sich vor
            der Tour über die geltenden Gesetze und Vorschriften in der Schweiz
            zu informieren.
          </Text>
        </Container>
      </PageFrame>
    </>
  );
};

export default Unfallverhlaten;

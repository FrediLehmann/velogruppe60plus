import {
  Box,
  Container,
  Heading,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';
import { PageFrame } from 'components';
import Head from 'next/head';

const Conditions = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Bedingungen</title>
      </Head>
      <PageFrame>
        <Container maxW="container.md" mt={['4', '6', '12']} pb="8">
          <Box as="section">
            <Heading as="h2" size="lg" mb="4">
              Verhaltensregeln
            </Heading>
            <UnorderedList>
              <ListItem>
                Wir tragen einen Helm und beachten die Verkehrsregeln
              </ListItem>
              <ListItem>
                Das Velo ist in verkehrstüchtigem Zustand und für Naturstrassen
                geeignet
              </ListItem>
              <ListItem>Wir befolgen die Anweisungen der Tourenleiter</ListItem>
              <ListItem>
                Ein genügend grosser Sicherheitsabstand ist einzuhalten,
                verlieren aber den Sichtkontakt nicht
              </ListItem>
              <ListItem>Wir fahren nicht nebeneinander</ListItem>
              <ListItem>
                Jeder Teilnehmer passt seine Fahrtüchtigkeit der Situation an
                und gefährdet keine anderen Teilnehmer
              </ListItem>
              <ListItem>
                Wenn eine Ampel auf Rot springt, halten wir an. Die Gruppe
                wartet aufeinander
              </ListItem>
              <ListItem>
                Bei Pannen und anderen Fahrtunterbrechungen ist der Tourenleiter
                oder Schlussmann zu informieren
              </ListItem>
              <ListItem>
                Die Gruppe wird nicht verlassen, ohne sich vorher beim
                Tourenleiter oder Schlussmann abzumelden
              </ListItem>
              <ListItem>
                Eine Anmeldung für die Touren ist nicht erforderlich.
              </ListItem>
              <ListItem>
                Für die Teilnahme wird ein Beitrag von Fr. 2.00 erhoben
              </ListItem>
              <ListItem>Die Versicherung ist Sache der Teilnehmenden</ListItem>
              <ListItem>
                Haftung: Die Teilnahme erfolgt auf eigenes Risiko
              </ListItem>
              <ListItem>
                Folgende Dokumente sind ebenfalls im Gepäck: ausgefüllter
                Notfallausweis (er wird neuen Teilnehmenden an der ersten Tour
                abgegeben)
              </ListItem>
            </UnorderedList>
          </Box>
          <Box as="section">
            <Heading as="h3" size="md" mt="8" mb="4">
              Es sind mitzunehmen
            </Heading>
            <UnorderedList>
              <ListItem>Getränke</ListItem>
              <ListItem>Snacks</ListItem>
              <ListItem>bei unsicherer Witterung Regenschutz</ListItem>
            </UnorderedList>
          </Box>
          <Box as="section">
            <Heading as="h2" size="lg" mt="8" mb="4">
              Velotouren
            </Heading>
            <UnorderedList>
              <ListItem>
                werden in der Regel jeden Mittwoch vom April bis Oktober als
                Halbtages- oder Tagestouren angeboten
              </ListItem>
              <ListItem>
                führen, wenn immer möglich, über Velowege abseits vom grossen
                Verkehr
              </ListItem>
              <ListItem>
                Die Touren sind auf unserer homepage ersichtlich unter der
                Rubrik: alle Touren
              </ListItem>
              <ListItem>
                Die Tourendetails können auf unserer homepage abgerufen werden,
                indem nach dem Beschrieb der aktuellen Tour auf den Link: Auf
                Schweiz Mobil anschauen geklickt wird
              </ListItem>
              <ListItem>
                Die Touren sind auf E-Bikes abgestimmt, sind aber für gut
                trainierte Teilnehmende ohne Motorunterstützung machbar
              </ListItem>
              <ListItem>
                Falls eine Tour wegen unsicherer Witterung nicht durchgeführt
                oder verschoben wird, erhalten alle eine Mitteilung per WhatsApp
              </ListItem>
            </UnorderedList>
          </Box>
          <Box as="section">
            <Heading as="h2" size="lg" mt="8" mb="4">
              Informationen zu den Touren
            </Heading>
            <UnorderedList>
              <ListItem>
                Tagestour mit Verpflegung Picknick oder Restaurant
              </ListItem>
              <ListItem>Tagestour An- und Rückfahrt mit dem Zug/Auto</ListItem>
              <ListItem>Alle Touren finden am Mittwoch statt</ListItem>
              <ListItem>
                Halbtagestouren am Nachmittag April, Mai, Juni, September bis
                Saisonende
              </ListItem>
              <ListItem>Halbtagestouren am Vormittag Juli, August</ListItem>
              <ListItem>
                Die Startzeit ist jeweils um 13:30 Uhr beziehungsweise um 8:30
                Uhr
              </ListItem>
              <ListItem>
                Die Startzeit kann den Wetterbedingungen entsprechend,
                kurzfristig angepasst werden (Wetterradar)
              </ListItem>
              <ListItem>Änderungen werden über WhatsApp mitgeteilt</ListItem>
              <ListItem>
                Die WhatsApp Gruppe dient ausschliesslich der
                Kommunikation/Information zu den Touren
              </ListItem>
              <ListItem>
                Die aktuellen Touren werden in der Zeitung
                Freiburger-Nachrichten (FN Rubrik Agenda) jeweils am Dienstag
                und Mittwoch publiziert. Auf unserer homepage sind die Touren
                ebenfalls ersichtlich
              </ListItem>
              <ListItem>
                Der Tourenleiter behält sich das Recht vor, die Tour kurzfristig
                aufgrund aussergewöhnlicher Umstände abzuändern
              </ListItem>
              <ListItem>Jede Tour hat einen Startpunkt und Zielpunkt</ListItem>
            </UnorderedList>
          </Box>
          <Box as="section">
            <Heading as="h2" size="lg" mt="8" mb="4">
              Gesetzliche Regeln für E-Bikes
            </Heading>
            <UnorderedList>
              <ListItem>
                fest angebrachte Beleuchtung, sowie nach hinten gerichtete
                Rückstrahler
              </ListItem>
              <ListItem>
                E-Bikes müssen seit dem 1. April 2022 tagsüber mit
                eingeschaltetem Licht fahren
              </ListItem>
              <ListItem>
                Eine Geschwindigkeitsübertretung nach Abzug der festgelegten
                Geräte- oder Messunsicherheit kann mit einer Busse von 30
                Franken geahndet werden.
              </ListItem>
              <ListItem>Eine Veloglocke ist erforderlich</ListItem>
              <ListItem>
                Das Tragen eines Velohelms ist nur für das Lenken der schnellen
                E-Bikes Pflicht, es wird jedoch allgemein empfohlen
              </ListItem>
              <ListItem>
                Für die Velogruppe60plus Sensetal erachten wir das Tragen eines
                Velohelm als Pflicht
              </ListItem>
            </UnorderedList>
          </Box>
        </Container>
      </PageFrame>
    </>
  );
};

export default Conditions;

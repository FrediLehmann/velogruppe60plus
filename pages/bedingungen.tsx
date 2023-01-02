import {
  Box,
  Container,
  Heading,
  ListItem,
  Text,
  OrderedList,
  Link
} from '@chakra-ui/react';
import { PageFrame } from 'components';
import Head from 'next/head';

const Conditions = () => {
  return (
    <>
      <Head>
        <title>Velogruppe 60+ Sensetal | Bedingungen</title>
        <meta
          name="description"
          content="Teilnahmebedingungen und Verhaltensregeln"
        />
      </Head>
      <PageFrame>
        <Container maxW="container.md" mt={['4', '6', '12']} pb="8">
          <Box as="article">
            <header>
              <Heading as="h2" size="lg" mb="4">
                Verhaltensregeln
              </Heading>
            </header>
            <main>
              <Text>
                Es gibt einige Verhaltensregeln, die bei Velotouren zu beachten
                sind, um die Sicherheit aller Teilnehmer zu gewährleisten:
              </Text>
              <OrderedList my="4" px="6">
                <ListItem>
                  Alle Teilnehmer tragen einen Helm und beachten die
                  Verkehrsregeln.
                </ListItem>
                <ListItem>
                  Das Velo ist in verkehrstüchtigem Zustand und für Naturstraßen
                  geeignet.
                </ListItem>
                <ListItem>
                  Alle Teilnehmer befolgen die Anweisungen des Tourenleiters.
                </ListItem>
                <ListItem>
                  Ein genügend großer Sicherheitsabstand ist einzuhalten, ohne
                  den Sichtkontakt zu verlieren.
                </ListItem>
                <ListItem>
                  Die Teilnehmer fahren nicht nebeneinander und passen ihre
                  Fahrtüchtigkeit der Situation an, um keine anderen Teilnehmer
                  zu gefährden.
                </ListItem>
                <ListItem>
                  Bei Rot an einer Ampel halten alle Teilnehmer an und warten
                  aufeinander.
                </ListItem>
                <ListItem>
                  Bei Pannen oder anderen Fahrtunterbrechungen wird der
                  Tourenleiter oder Schlussmann informiert.
                </ListItem>
                <ListItem>
                  Die Gruppe wird nicht verlassen, ohne sich vorher beim
                  Tourenleiter oder Schlussmann abzumelden.
                </ListItem>
                <ListItem>
                  Eine Anmeldung für die Touren ist nicht erforderlich, es wird
                  jedoch ein Beitrag von CHF 2.00 erhoben.
                </ListItem>
                <ListItem>
                  Die Versicherung ist Sache der Teilnehmer. Die Teilnahme an
                  der Tour erfolgt auf eigene Risiko.
                </ListItem>
                <ListItem>
                  Im Gepäck sollten auch ein ausgefüllter Notfallausweis und
                  weitere wichtige Dokumente mitgeführt werden. Neue Teilnehmer
                  erhalten den Notfallausweis an ihrer ersten Tour.
                </ListItem>
              </OrderedList>
              <Text fontWeight="semibold">
                Es ist wichtig, dass alle Teilnehmer diese Verhaltensregeln
                beachten, um sicher und rechtlich korrekt unterwegs zu sein.
              </Text>
              <Heading as="h3" size="md" mt="8" mb="4">
                Es sind mitzunehmen
              </Heading>
              <Text>
                Wenn Sie an einer Velotour teilnehmen, sollten Sie ausreichend
                Getränke und Snacks mitnehmen, um sich während der Tour zu
                stärken und zu hydrieren. Es empfiehlt sich auch, bei unsicherer
                Witterung Regenschutz mitzunehmen, um sich vor möglichem Regen
                zu schützen. Es ist wichtig, dass Sie sich gut vorbereiten, um
                eine angenehme und sichere Tour zu erleben.
              </Text>
            </main>
          </Box>
          <Box as="article">
            <header>
              <Heading as="h2" size="lg" mt="8" mb="4">
                Velotouren
              </Heading>
            </header>
            <main>
              <Text>
                Velotouren werden in der Regel jeden Mittwoch vom April bis
                Oktober als Halbtages- oder Tagestouren angeboten und führen,
                wenn möglich, über Velowege abseits vom großen Verkehr. Die
                Tourendetails können auf der Homepage der{' '}
                <Link
                  href="https://www.velogruppe60plus-sensetal.ch"
                  color="green.500">
                  https://www.velogruppe60plus-sensetal.ch
                </Link>{' '}
                Sensetal abgerufen werden, indem auf den Link &quot;Auf Schweiz
                Mobil anschauen&quot; geklickt wird. Die Touren sind für E-Bikes
                abgestimmt, aber für gut trainierte Teilnehmer auch ohne
                Motorunterstützung machbar. Falls eine Tour wegen unsicherer
                Witterung nicht durchgeführt oder verschoben wird, erhalten alle
                Teilnehmer eine Mitteilung per WhatsApp und auf der Homepage. Es
                empfiehlt sich, sich vor der Tour über die genauen Details und
                den Ablauf zu informieren und sich an die Anweisungen des
                Tourenleiters zu halten, um eine sichere und angenehme Tour zu
                erleben.
              </Text>
              <Heading as="h3" size="md" mt="8" mb="4">
                Informationen zu den Touren
              </Heading>
              <Text>
                Es gibt einige wichtige Hinweise, die für die Teilnehmer von
                eBike-Touren Velogruppe60plus-Sensetal wissen sollten:
              </Text>
              <OrderedList my="4" px="6">
                <ListItem>
                  Die Touren finden am Mittwoch statt und können entweder als
                  Tagestour mit Verpflegung (Picknick oder Restaurant) oder als
                  Halbtagestour (am Nachmittag im April, Mai, Juni, September
                  bis Saisonende oder am Vormittag im Juli und August)
                  durchgeführt werden.
                </ListItem>
                <ListItem>
                  Die Startzeit kann den Wetterbedingungen entsprechend
                  kurzfristig angepasst werden (Wetterradar). Änderungen werden
                  über WhatsApp mitgeteilt.
                </ListItem>
                <ListItem>
                  Die WhatsApp-Gruppe dient ausschließlich der
                  Kommunikation/Information zu den Touren. Die aktuellen Touren
                  werden außerdem in der Zeitung &quot;Freiburger-
                  Nachrichten&quot; (FN Rubrik Agenda) jeweils am Dienstag und
                  Mittwoch publiziert und sind auf der Homepage ersichtlich.
                </ListItem>
                <ListItem>
                  Der Tourenleiter behält sich das Recht vor, die Tour
                  kurzfristig aufgrund außergewöhnlicher Umstände abzuändern.
                </ListItem>
                <ListItem>
                  Jede Tour hat einen Startpunkt und Zielpunkt. Die An- und
                  Rückfahrt kann mit dem Zug oder dem Auto erfolgen.
                </ListItem>
              </OrderedList>
              <Text fontWeight="semibold">
                Es empfiehlt sich, sich vor der Tour über die genauen Details
                und den Ablauf zu informieren und sich an die Anweisungen des
                Tourenleiters zu halten, um eine sichere und angenehme Tour zu
                erleben.
              </Text>
            </main>
          </Box>
          <Box as="article">
            <header>
              <Heading as="h2" size="lg" mt="8" mb="4">
                Gesetzliche Regeln für E-Bikes
              </Heading>
            </header>
            <main>
              <Text>
                In der Schweiz gelten für das Fahren von E-Bikes einige
                gesetzliche Regeln, die es zu beachten gilt. Hier sind einige
                wichtige Punkte:
              </Text>
              <OrderedList my="4" px="6">
                <ListItem>
                  E-Bikes müssen mit fest angebrachter Beleuchtung ausgestattet
                  sein, die nach vorne und nach hinten strahlt. Zusätzlich sind
                  Rückstrahler erforderlich, um von hinten gesehen zu werden.
                </ListItem>
                <ListItem>
                  Seit dem 1. April 2022 müssen E-Bikes tagsüber mit
                  eingeschaltetem Licht fahren.
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
                  Das Tragen eines Velohelms ist nur für das Lenken von
                  schnellen E-Bikes Pflicht. Es wird jedoch allgemein empfohlen,
                  auch beim Fahren von E-Bikes einen Helm zu tragen, um sich im
                  Falle eines Unfalls zu schützen.
                </ListItem>
              </OrderedList>
              <Text>
                Es ist wichtig, dass Tourteilnehmer diese Regeln beachten, um
                sicher und rechtlich korrekt unterwegs zu sein. Es empfiehlt
                sich, sich vor der Tour über die geltenden Gesetze und
                Vorschriften in der Schweiz zu informieren.
              </Text>
            </main>
          </Box>
          <Box as="article">
            <header>
              <Heading as="h2" size="lg" mt="8" mb="4">
                Unfallverhalten
              </Heading>
            </header>
            <main>
              <Text>
                Im Falle eines Unfalls mit einem eBike gibt es einige wichtige
                Schritte, die Sie beachten sollten:
              </Text>
              <OrderedList my="4" px="6">
                <ListItem>
                  Beruhigen Sie sich und bleiben Sie ruhig: Versuchen Sie, ruhig
                  zu bleiben und sich zu konzentrieren. Atmen Sie tief durch und
                  versuchen Sie, Ihre Gedanken zu sammeln.
                </ListItem>
                <ListItem>
                  Rufen Sie umgehend den Notruf: Wenn Sie oder jemand anderes
                  verletzt wurde, rufen Sie so schnell wie möglich den Notruf
                  (in Schweiz: 144). Geben Sie an, wo Sie sind und beschreiben
                  Sie die Art der Verletzungen.
                </ListItem>
                <ListItem>
                  Versuchen Sie, die Unfallstelle zu sichern: Wenn möglich,
                  sichern Sie die Unfallstelle, um weitere Unfälle zu vermeiden.
                  Stellen Sie das eBike an einem sicheren Ort ab und setzen Sie
                  warneinblendende Triangel auf, wenn vorhanden.
                </ListItem>
                <ListItem>
                  Helfen Sie Verletzten: Wenn jemand verletzt wurde, versuchen
                  Sie, ihm oder ihr zu helfen. Beruhigen Sie die Person und
                  versuchen Sie, die Verletzungen zu stabilisieren, indem Sie
                  etwa blutende Wunden abdecken oder Schmerzen lindern.
                </ListItem>
                <ListItem>
                  Nehmen Sie Hilfe an: Wenn andere Personen Ihnen helfen
                  möchten, nehmen Sie diese Hilfe dankbar an. Sie können von
                  anderen Personen etwa bei der Sicherung der Unfallstelle, der
                  Versorgung von Verletzungen oder dem Rufen des Notrufs
                  unterstützt werden.
                </ListItem>
                <ListItem>
                  Verfolgen Sie die Anweisungen der Helfer: Folgen Sie den
                  Anweisungen der Helfer, wenn diese Ihnen sagen, was Sie tun
                  sollen. Sie wissen möglicherweise, wie man in einer bestimmten
                  Situation am besten vorgeht und können Ihnen dabei helfen,
                  sich sicherer zu fühlen.
                </ListItem>
                <ListItem>
                  Geben Sie Auskunft über den Unfall: Geben Sie den Helfern so
                  viele Informationen wie möglich über den Unfall, damit diese
                  wissen, wie sie Ihnen am besten helfen können. Erzählen Sie
                  ihnen etwa, wo der Unfall passiert ist, wie es dazu kam und ob
                  jemand verletzt wurde.
                </ListItem>
                <ListItem>
                  Machen Sie Fotos: Machen Sie Fotos von der Unfallstelle und
                  dem eBike, um Beweismaterial zu sammeln. Diese Fotos können
                  später bei der Schadensregulierung hilfreich sein.
                </ListItem>
                <ListItem>
                  Informieren Sie die Polizei: Melden Sie den Unfall der Polizei
                  (in der Schweiz 117)v, wenn es sich um einen schweren Unfall
                  handelt oder wenn es Sachschäden oder Verletzungen gibt. Die
                  Polizei wird eine Unfallprotokoll erstellen, das für die
                  Schadensregulierung wichtig sein kann.
                </ListItem>
                <ListItem>
                  Machen Sie sich Notizen: Machen Sie sich Notizen zu dem
                  Unfall, um Details später besser zu erinnern. Notieren Sie
                  sich Dinge wie den Unfallort, die Uhrzeit, das Wetter und die
                  Umstände des Unfalls.
                </ListItem>
                <ListItem>
                  Kontaktieren Sie Ihre Versicherung: Informieren Sie Ihre
                  Versicherung über den Unfall, um die Schadensregulierung in
                  die Wege zu leiten. Stellen Sie sicher, dass Sie alle
                  notwendigen Unterlagen, wie das Unfallprotokoll der Polizei,
                  bereithalten.
                </ListItem>
              </OrderedList>
              <Heading as="h3" size="md" mt="8" mb="4">
                App EchoSOS
              </Heading>
              <Text>
                EchoSOS ist eine App, die im Notfall als zusätzliche Sicherheit
                dienen kann. Die App kann auf dem Smartphone installiert werden
                und ermöglicht es dem Nutzer, sich in akuten Notfällen direkt
                mit dem Notruf in Verbindung zu setzen. Die App kann auch
                automatisch den Standort des Nutzers an den Notruf senden, um
                die Einsatzkräfte schneller zu Ihnen zu führen. EchoSOS ist vor
                allem für Menschen nützlich, die sich in abgelegenen Gebieten
                oder alleine unterwegs sind und schnell Hilfe benötigen. Es kann
                auch für Menschen hilfreich sein, die aufgrund von
                Vorerkrankungen oder Behinderungen möglicherweise nicht in der
                Lage sind, selbst den Notruf zu wählen. Es ist wichtig zu
                beachten, dass EchoSOS kein Ersatz für den Notruf ist und immer
                der Notruf (in Schweiz: 144) als erste Wahl für Notfälle
                angesehen werden sollte. Die App sollte als zusätzliche
                Sicherheit betrachtet werden und nicht als primäre Möglichkeit
                zur Hilfeleistung
              </Text>
              <Heading as="h3" size="md" mt="8" mb="4">
                Nach Unfall E-Bike Tour fortsetzen
              </Heading>
              <Text>
                Es ist wichtig, dass alle Beteiligten bei einem Unfall auf einem
                eBike sicherstellen, dass sie sich in einer sicheren Umgebung
                befinden und dass niemand verletzt ist. Wenn jemand verletzt
                ist, sollte sofort medizinische Hilfe geholt werden. Wenn alle
                Beteiligten unverletzt sind, sollten sie sich um das beschädigte
                Fahrrad kümmern und entscheiden, ob es repariert werden kann
                oder ob es abtransportiert werden muss. Wenn möglich, sollte das
                Fahrrad sicher gestellt werden, damit es nicht gestohlen wird.
                Wenn der Unfall von einem anderen Fahrzeug verursacht wurde,
                sollten alle Beteiligten die Polizei informieren und eine
                Unfallmeldung ausfüllen. Es ist auch wichtig, dass alle
                Beteiligten ihre Kontaktdaten und Versicherungsinformationen
                austauschen. Wenn alle Beteiligten sich in einer sicheren
                Umgebung befinden und das Fahrrad repariert oder abtransportiert
                wurde, können die anderen Teilnehmer der Tour entscheiden, ob
                sie fortfahren oder die Tour abbrechen möchten. Wenn sie
                beschließen, die Tour fortzusetzen, sollten sie sicherstellen,
                dass sie alle notwendigen Vorsichtsmaßnahmen ergreifen, um sich
                selbst und andere zu schützen. Dazu gehört, dass sie sich an die
                Verkehrsregeln halten und sich auf die Straße konzentrieren. Es
                ist auch wichtig, dass alle Teilnehmer aufeinander achten und
                sich gegenseitig unterstützen, wenn es nötig ist. Es ist auch
                ratsam, dass die Teilnehmer der Tour ihre Kommunikation und
                Koordination verbessern, um sicherzustellen, dass sie alle über
                die aktuelle Situation und den weiteren Verlauf der Tour
                informiert sind. Insgesamt sollten alle Teilnehmer der Tour
                verantwortungsbewusst und sicher fahren und sich gegenseitig
                unterstützen, um sicherzustellen, dass die Tour erfolgreich
                fortgesetzt werden kann.
              </Text>
              <Heading as="h3" size="md" mt="8" mb="4">
                Verhaltenskodex nach einem Unfall
              </Heading>
              <Text>
                Ein Verhaltenskodex nach einem Unfall beschreibt die Regeln und
                Verhaltensweisen, die nach einem Unfall zu beachten sind. Es
                gibt einige allgemeine Empfehlungen, die in einem
                Verhaltenskodex nach einem Unfall enthalten sein sollten:
              </Text>
              <OrderedList my="4" px="6">
                <ListItem>
                  Sicherheit geht vor: Stellen Sie sicher, dass alle Beteiligten
                  in Sicherheit sind und, falls erforderlich, medizinische Hilfe
                  in Anspruch nehmen.
                </ListItem>
                <ListItem>
                  Unfall melden: Melden Sie den Unfall der Polizei und/oder dem
                  Unfallversicherer, falls erforderlich.
                </ListItem>
                <ListItem>
                  Beweise sichern: Machen Sie Fotos von der Unfallstelle und
                  beschädigen Sie keine Beweismittel.
                </ListItem>
                <ListItem>
                  Keine Schuldzuweisungen: Vermeiden Sie es, Schuldzuweisungen
                  zu machen oder Vorwürfe zu erheben.
                </ListItem>
                <ListItem>
                  Kooperation: Kooperieren Sie mit den Ermittlungsbehörden und
                  den Versicherungen, um den Unfall schnellstmöglich
                  aufzuklären.
                </ListItem>
              </OrderedList>
              <Text fontWeight="semibold">
                Es ist wichtig, dass alle Beteiligten nach einem Unfall
                verantwortungsbewusst handeln und sich an diese Regeln halten,
                um unnötige Konflikte und Probleme zu vermeiden.
              </Text>
            </main>
          </Box>
        </Container>
      </PageFrame>
    </>
  );
};

export default Conditions;

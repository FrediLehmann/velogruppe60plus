import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const RulesOfConduct = () => {
  return (
    <Box as="section">
      <Heading as="h2" size="md" color="green.800">
        Verhaltensregeln
      </Heading>
      <Heading as="h2" size="lg" mb="3">
        Wie verhalte ich mich richtig?
      </Heading>
      <Text fontSize="lg">
        Es gelten Rahmenbedingungen und Verhaltensregeln die zu beachten sind um
        die Sicherheit aller Teilnehmer zu gewährleisten.
      </Text>
      <UnorderedList my="4" px="6">
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Alle Teilnehmer tragen einen Helm und beachten die Verkehrsregeln.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Nehman Sie ausreichend Getränke und Snacks mit.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Es empfiehlt sich bei unsicherer Witterung Regenschutz mitzunehmen.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Das Velo ist in verkehrstüchtigem Zustand und für Naturstraßen
          geeignet.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Alle Teilnehmer befolgen die Anweisungen des Tourenleiters.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Ein genügend großer Sicherheitsabstand ist einzuhalten, ohne den
          Sichtkontakt zu verlieren.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Die Teilnehmer fahren nicht nebeneinander und passen ihre
          Fahrtüchtigkeit der Situation an, um keine anderen Teilnehmer zu
          gefährden.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Bei Rot an einer Ampel halten alle Teilnehmer an und warten
          aufeinander.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Bei Pannen oder anderen Fahrtunterbrechungen wird der Tourenleiter
          oder Schlussmann informiert.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Die Gruppe wird nicht verlassen, ohne sich vorher beim Tourenleiter
          oder Schlussmann abzumelden.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Eine Anmeldung für die Touren ist nicht erforderlich, es wird jedoch
          ein Beitrag von CHF 2.00 erhoben.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Die Versicherung ist Sache der Teilnehmer. Die Teilnahme an der Tour
          erfolgt auf eigene Risiko.
        </ListItem>
        <ListItem fontSize="lg" fontWeight="semibold" py="1">
          Im Gepäck sollten auch ein ausgefüllter Notfallausweis und weitere
          wichtige Dokumente mitgeführt werden. Neue Teilnehmer erhalten den
          Notfallausweis an ihrer ersten Tour.
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default RulesOfConduct;

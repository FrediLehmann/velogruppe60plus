'use client';

import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

export default function EBikeSecurity() {
	return (
		<Box as="section">
			<Heading as="h2" size="md" color="green.800">
				Sicherheit
			</Heading>
			<Heading as="h2" size="lg" mb="3">
				Was sind die wichtigsten Sicherheitsaspekte für E-Bike Radtouren?
			</Heading>
			<Text fontSize="lg">
				Alle Beteiligten, sowohl Tourenleiter als auch Teilnehmer, sollten unbedingt auf diese
				Sicherheitsaspekte achten, um das Risiko von Unfällen und Verletzungen bei den E-Bike
				Radtouren zu minimieren.
			</Text>
			<UnorderedList my="4" px="6">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Regelmäßige Wartung und Überprüfung der E-Bikes auf ihre Verkehrssicherheit, um
					sicherzustellen, dass sie keine Defekte aufweisen, die Unfälle verursachen können.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Teilnehmer sollten über die korrekte Nutzung des E-Bikes informiert sein, insbesondere
					über das Bremsverhalten, den Umgang mit der Batterie und die Handhabung des
					unterstützenden E-Motors.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Vor jeder Tour sollten die Teilnehmer ihre fahrerischen Fähigkeiten und ihre körperliche
					Verfassung realistisch einschätzen, um Überforderungen und daraus resultierende Unfälle zu
					vermeiden.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Das Tragen eines geeigneten Helms ist vorgeschrieben. Es wird auch empfohlen, passende
					Schutzbekleidung wie Handschuhe und Fahrradhosen zu tragen.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Die Route sollte sorgfältig geplant werden, um gefährliche Straßenabschnitte, Baustellen
					und andere Risikofaktoren zu vermeiden.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Während der Tour sollten die Teilnehmer im Auge behalten werden, um sicherzustellen, dass
					niemand verloren geht oder allein gelassen wird.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Im Falle eines Unfalls oder Notfalls sollte ein Plan zur schnellen und effektiven
					Hilfeleistung vorhanden sein.
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Die Teilnehmer sollten über die lokalen Verkehrsregeln und -vorschriften informiert sein,
					um sicherzustellen, dass sie sich an die örtlichen Gegebenheiten anpassen können.
				</ListItem>
			</UnorderedList>
		</Box>
	);
}

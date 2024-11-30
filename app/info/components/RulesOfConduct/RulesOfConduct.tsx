'use client';

import { Box, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';

export default function RulesOfConduct() {
	return (
		<Box as="section">
			<Heading as="h2" size="md" color="green.800">
				Verhaltensregeln
			</Heading>
			<Heading as="h2" size="lg" mb="3">
				Verhaltensregeln der Velogruppe
			</Heading>
			<Text fontSize="lg">
				Die Velogruppe 60 Plus Sensetal legt grossen Wert auf die Sicherheit und das Wohlbefinden
				aller Teilnehmenden. Um einen reibungslosen Ablauf und ein angenehmes Fahrerlebnis zu
				gewährleisten, gelten die folgenden Verhaltensregeln:
			</Text>
			<Heading as="h3" size="md" mb="3" mt="6">
				Grundlegende Sicherheitsmassnahmen
			</Heading>
			<OrderedList my="4" px="6">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Helmpflicht:
					<Text fontWeight="normal" as="span" ml="1">
						Alle Teilnehmenden tragen während der Tour einen Helm.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Verkehrsregeln:
					<Text fontWeight="normal" as="span" ml="1">
						Die Einhaltung der geltenden Verkehrsregeln ist verpflichtend.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Verkehrstüchtiges eBike:
					<Text fontWeight="normal" as="span" ml="1">
						Die Fahrräder müssen in technisch einwandfreiem Zustand sein und für Naturstrassen
						geeignet sein.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Notfallausweis:
					<Text fontWeight="normal" as="span" ml="1">
						Jede*r Teilnehmende führt einen ausgefüllten Notfallausweis sowie wichtige persönliche
						Dokumente mit. Neue Mitglieder erhalten den Ausweis bei ihrer ersten Tour.
					</Text>
				</ListItem>
			</OrderedList>
			<Heading as="h3" size="md" mb="3" mt="6">
				Ausrüstung
			</Heading>
			<OrderedList my="4" px="6" start="5">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Getränke und Snacks:
					<Text fontWeight="normal" as="span" ml="1">
						Jede*r sollte ausreichend Flüssigkeit und Verpflegung mitführen.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Wetterschutz:
					<Text fontWeight="normal" as="span" ml="1">
						Bei unsicherer Wetterlage ist entsprechende Schutzkleidung, wie Regen- oder
						Sonnenschutz, mitzubringen.
					</Text>
				</ListItem>
			</OrderedList>
			<Heading as="h3" size="md" mb="3" mt="6">
				Verhalten während der Tour
			</Heading>
			<OrderedList my="4" px="6" start="7">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Anweisungen:
					<Text fontWeight="normal" as="span" ml="1">
						Die Anweisungen der Tourenleitung sind zu jeder Zeit zu befolgen.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Fahrweise:
					<UnorderedList fontWeight="normal">
						<ListItem>
							Ein ausreichender Sicherheitsabstand zu anderen Teilnehmenden ist jederzeit
							einzuhalten, ohne den Sichtkontakt zu verlieren.
						</ListItem>
						<ListItem>Es wird hintereinander gefahren, nicht nebeneinander.</ListItem>
						<ListItem>
							Die Geschwindigkeit und das Fahrverhalten sind stets der Gruppendynamik und den
							äusseren Bedingungen anzupassen.
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Ampeln:
					<Text fontWeight="normal" as="span" ml="1">
						Bei roten Ampeln halten alle an und warten aufeinander.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Pannen oder Unterbrechungen:
					<Text fontWeight="normal" as="span" ml="1">
						Bei technischen Problemen oder Fahrtunterbrechungen wird die Tourenleitung oder der
						Schlussmann sofort informiert.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Gruppenzusammenhalt:
					<Text fontWeight="normal" as="span" ml="1">
						Es ist nicht gestattet, die Gruppe ohne vorherige Abmeldung bei der Tourenleitung oder
						dem Schlussmann zu verlassen.
					</Text>
				</ListItem>
			</OrderedList>
			<Heading as="h3" size="md" mb="3" mt="6">
				Organisatorische Hinweise
			</Heading>
			<OrderedList my="4" px="6" start="12">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Kostenbeteiligung:
					<Text fontWeight="normal" as="span" ml="1">
						Für die Teilnahme an jeder Tour wird ein Beitrag von CHF 2.00 erhoben.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Anmeldung:
					<Text fontWeight="normal" as="span" ml="1">
						Eine vorherige Anmeldung ist in der Regel nicht erforderlich. Für bestimmte Ausflüge
						oder Veranstaltungen kann jedoch aus organisatorischen Gründen eine Anmeldung notwendig
						sein. Informationen hierzu werden, sofern möglich, über WhatsApp kommuniziert.
					</Text>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Versicherung:
					<Text fontWeight="normal" as="span" ml="1">
						Die Teilnahme erfolgt auf eigenes Risiko. Die Versicherung ist Sache der Teilnehmenden.
					</Text>
				</ListItem>
			</OrderedList>
			<Text fontSize="lg">
				Diese Regeln dienen dem Schutz und der Sicherheit aller. Mit ihrer Einhaltung tragen alle
				Teilnehmenden zu einem harmonischen und erfolgreichen Fahrerlebnis bei.
			</Text>
		</Box>
	);
}

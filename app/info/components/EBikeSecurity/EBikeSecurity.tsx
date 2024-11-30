'use client';

import { Box, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';

export default function EBikeSecurity() {
	return (
		<Box as="section">
			<Heading as="h2" size="md" color="green.800">
				Sicherheit
			</Heading>
			<Heading as="h2" size="lg" mb="3">
				Sicherheitsaspekte für die Teilnehmer von E-Bike-Radtouren
			</Heading>
			<Text fontSize="lg">
				Die Sicherheit der Teilnehmer steht bei den E-Bike-Radtouren der Velogruppe 60 Plus Sensetal
				an erster Stelle. Sowohl die organisatorischen Massnahmen der Tourenleitung als auch die
				persönliche Verantwortung der Teilnehmer tragen wesentlich dazu bei, Risiken zu minimieren.
				Die nachstehenden Punkte sind speziell auf die Sicherheit und das Wohlbefinden der
				Teilnehmer ausgerichtet.
			</Text>
			<OrderedList my="4" px="6">
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Individuelle Vorbereitung der Teilnehmer
					<UnorderedList>
						<ListItem>
							Gesundheitliche Eignung
							<Text fontWeight="normal" as="span" ml="1">
								Jeder Teilnehmer sollte vor der Tour sicherstellen, dass seine körperliche
								Verfassung für die geplante Strecke ausreichend ist. Bei gesundheitlichen
								Einschränkungen ist eine vorherige Rücksprache mit der Tourenleitung oder einem Arzt
								empfehlenswert.
							</Text>
						</ListItem>
						<ListItem>
							Fahrtechnik
							<Text fontWeight="normal" as="span" ml="1">
								Teilnehmer sollten mit den Besonderheiten des E-Bikes, wie dem Ansprechverhalten des
								Motors und dem Bremsverhalten, vertraut sein. Falls erforderlich, sind
								Übungseinheiten vorab sinnvoll.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Pflichtausrüstung und persönliche Sicherheit
					<UnorderedList>
						<ListItem>
							Helmpflicht
							<Text fontWeight="normal" as="span" ml="1">
								Das Tragen eines geprüften Fahrradhelms ist obligatorisch. Helme müssen richtig
								sitzen, um optimalen Schutz zu gewährleisten.
							</Text>
						</ListItem>
						<ListItem>
							Sichtbarkeit
							<Text fontWeight="normal" as="span" ml="1">
								Gut sichtbare Kleidung und reflektierende Elemente erhöhen die Sicherheit, besonders
								bei schlechten Lichtverhältnissen.
							</Text>
						</ListItem>
						<ListItem>
							Schutzkleidung
							<Text fontWeight="normal" as="span" ml="1">
								Fahrradhandschuhe schützen bei Stürzen, und gepolsterte Fahrradhosen sorgen für
								Komfort auf längeren Touren.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Verantwortungsbewusstes Fahren in der Gruppe
					<UnorderedList>
						<ListItem>
							Gruppenkoordination
							<Text fontWeight="normal" as="span" ml="1">
								Teilnehmer sollten die Geschwindigkeit an die Gruppe anpassen und keine riskanten
								Überholmanöver durchführen. Abstände zwischen den Fahrern müssen ausreichend sein,
								um plötzliche Bremsmanöver abzufangen.
							</Text>
						</ListItem>
						<ListItem>
							Kommunikation
							<Text fontWeight="normal" as="span" ml="1">
								Klare Handzeichen und Absprachen innerhalb der Gruppe unterstützen ein sicheres
								Fahren. Hinweise auf Gefahrenstellen oder Hindernisse sollten sofort weitergegeben
								werden.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Technische Sicherheit des E-Bikes
					<UnorderedList>
						<ListItem>
							Eigenkontrolle vor der Tour
							<Text fontWeight="normal" as="span" ml="1">
								Jeder Teilnehmer ist für die Verkehrstüchtigkeit seines E-Bikes verantwortlich. Vor
								Fahrtantritt sollten Bremsen, Beleuchtung, Reifen und der Akku überprüft werden.
							</Text>
						</ListItem>
						<ListItem>
							Reichweite des Akkus
							<Text fontWeight="normal" as="span" ml="1">
								Teilnehmer sollten sicherstellen, dass der Akku ausreichend geladen ist, um die
								geplante Strecke zu bewältigen.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Risikominimierung auf der Route
					<UnorderedList>
						<ListItem>
							Geeignete Routenwahl
							<Text fontWeight="normal" as="span" ml="1">
								Die Tourenleitung plant die Strecken, aber die Teilnehmer sollten sich der
								Besonderheiten bewusst sein. Gefährliche Kreuzungen oder steile Abfahrten erfordern
								erhöhte Aufmerksamkeit.
							</Text>
						</ListItem>
						<ListItem>
							Pausen
							<Text fontWeight="normal" as="span" ml="1">
								Regelmässige Pausen zur Erholung sind wichtig, um die Konzentration
								aufrechtzuerhalten und Übermüdung zu vermeiden.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Notfallvorsorge
					<UnorderedList>
						<ListItem>
							Notfallkontakt
							<Text fontWeight="normal" as="span" ml="1">
								Teilnehmer sollten stets einen Notfallausweis mit persönlichen Daten,
								Kontaktinformationen und relevanten medizinischen Angaben bei sich führen.
							</Text>
						</ListItem>
						<ListItem>
							Erste-Hilfe-Kenntnisse
							<Text fontWeight="normal" as="span" ml="1">
								Grundlagen der Ersten Hilfe sind hilfreich, um im Notfall schnell reagieren zu
								können. Die Tourenleitung sorgt für ein Erste-Hilfe-Set.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
				<ListItem fontSize="lg" fontWeight="semibold" py="1">
					Einhaltung von Verkehrsregeln
					<UnorderedList>
						<ListItem>
							Respekt vor anderen Verkehrsteilnehmern
							<Text fontWeight="normal" as="span" ml="1">
								Teilnehmer sollten vorausschauend fahren, Handzeichen geben und sich stets an die
								geltenden Verkehrsregeln halten.
							</Text>
						</ListItem>
						<ListItem>
							Radwegnutzung
							<Text fontWeight="normal" as="span" ml="1">
								Wenn vorhanden, sollten ausschliesslich Radwege genutzt werden, um Konflikte mit
								motorisiertem Verkehr zu vermeiden.
							</Text>
						</ListItem>
					</UnorderedList>
				</ListItem>
			</OrderedList>
			<Text fontSize="lg">
				Die Sicherheit der Teilnehmer ist eine gemeinsame Verantwortung von Tourenleitung und
				Teilnehmern. Durch eine gute Vorbereitung, angemessene Vorsichtsmassnahmen und gegenseitige
				Rücksichtnahme kann die Velogruppe 60 Plus Sensetal sichere und unbeschwerte Touren
				geniessen.
			</Text>
		</Box>
	);
}

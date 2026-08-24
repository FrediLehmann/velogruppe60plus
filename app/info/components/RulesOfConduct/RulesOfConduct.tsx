'use client';

import { Box, Heading, List, Text } from '@chakra-ui/react';

export default function RulesOfConduct() {
	return (
		<Box as="section">
			<Heading as="h2" size="xl" color="green.800">
				Sicherheits- und Verhaltensregeln
			</Heading>
			<Heading as="h2" size="3xl" mb="3">
				Verhaltensregeln der Velogruppe
			</Heading>
			<Text fontSize="lg">
				Damit unsere E-Bike-Touren für alle Teilnehmenden sicher, entspannt und erlebnisreich
				verlaufen, bitten wir Sie, die folgenden Hinweise zu beachten. Gute Touren beginnen mit
				einer guten Vorbereitung – sowohl durch die Tourenleitung als auch durch jede Teilnehmerin
				und jeden Teilnehmer.
			</Text>
			<Heading as="h3" size="2xl" mb="3" mt="6">
				Vor der Tour – Gut vorbereitet unterwegs
			</Heading>
			<Heading as="h3" size="md" mb="3" mt="6">
				Gesundheit & Fahrbereitschaft
			</Heading>
			<List.Root>
				<List.Item fontSize="lg" py="1">
					Nehmen Sie nur an der Tour teil, wenn Sie sich gesundheitlich fit fühlen.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Bei gesundheitlichen Einschränkungen oder Unsicherheiten sprechen Sie bitte vorgängig mit
					Ihrem Arzt oder informieren Sie die Tourenleitung.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Machen Sie sich mit Ihrem E-Bike vertraut. Besonders wichtig sind das sichere Anfahren mit
					Motorunterstützung sowie das kontrollierte Bremsen.
				</List.Item>
			</List.Root>
			<Heading as="h3" size="md" mb="3" mt="6">
				Ausrüstung
			</Heading>
			<Text fontSize="lg">Für Ihre Sicherheit und Ihren Komfort empfehlen wir:</Text>
			<List.Root>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Helm:
					<Text fontWeight="normal" as="span" ml="1">
						Das Tragen eines gut sitzenden, geprüften Fahrradhelms ist auf allen Touren
						obligatorisch.
					</Text>
				</List.Item>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Bekleidung:
					<Text fontWeight="normal" as="span" ml="1">
						Helle oder reflektierende Kleidung erhöht Ihre Sichtbarkeit. Fahrradhandschuhe und
						gepolsterte Velohosen sorgen für zusätzlichen Schutz und Komfort.
					</Text>
				</List.Item>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Wetterschutz:
					<Text fontWeight="normal" as="span" ml="1">
						Regenjacke sowie Sonnen- und Hitzeschutz gehören zur Grundausrüstung. Unsere Touren
						finden grundsätzlich bei jedem Wetter statt, sofern sie nicht durch die Tourenleitung
						abgesagt werden.
					</Text>
				</List.Item>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Verpflegung:
					<Text fontWeight="normal" as="span" ml="1">
						Bitte nehmen Sie genügend Getränke und einen kleinen Snack mit.
					</Text>
				</List.Item>
			</List.Root>
			<Heading as="h3" size="md" mb="3" mt="6">
				E-Bike-Check
			</Heading>
			<Text fontSize="lg">Kontrollieren Sie vor jeder Tour Ihr E-Bike:</Text>
			<List.Root>
				<List.Item fontSize="lg" py="1">
					Bremsen und Beleuchtung funktionieren einwandfrei.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Reifendruck und Reifenprofil sind in Ordnung.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Der Akku ist ausreichend geladen und reicht für die geplante Strecke inklusive
					Sicherheitsreserve.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Das E-Bike ist verkehrstüchtig und für Naturstrassen geeignet.
				</List.Item>
			</List.Root>
			<Heading as="h3" size="2xl" mb="3" mt="6">
				Während der Tour – Gemeinsam sicher unterwegs
			</Heading>
			<Heading as="h3" size="md" mb="3" mt="6">
				Tourenleitung
			</Heading>
			<Text fontSize="lg">
				Die Tourenleitung und der Schlussfahrer sorgen für einen sicheren Ablauf der Tour. Ihren
				Anweisungen ist im Interesse aller Folge zu leisten.
			</Text>
			<Heading as="h3" size="md" mb="3" mt="6">
				Fahren in der Gruppe
			</Heading>
			<List.Root>
				<List.Item fontSize="lg" py="1">
					Wir fahren grundsätzlich hintereinander und nicht nebeneinander.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Halten Sie genügend Abstand zum vorausfahrenden E-Bike.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Die Geschwindigkeit richtet sich nach der langsamsten Person der Gruppe. Niemand wird
					zurückgelassen.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Riskante Überholmanöver sind zu vermeiden.
				</List.Item>
			</List.Root>
			<Heading as="h3" size="md" mb="3" mt="6">
				Kommunikation
			</Heading>
			<List.Root>
				<List.Item fontSize="lg" py="1">
					Machen Sie Gefahren wie Schlaglöcher, Kies, Hindernisse oder abbiegende Fahrzeuge
					frühzeitig mit Handzeichen oder Zurufen aufmerksam.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Bei roten Ampeln oder anderen Stopps wartet die Gruppe, bis alle wieder gemeinsam
					weiterfahren können.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Bei einer Panne oder gesundheitlichen Problemen informieren Sie sofort die Tourenleitung
					oder den Schlussfahrer.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Verlassen Sie die Gruppe niemals ohne Rücksprache mit der Tourenleitung.
				</List.Item>
			</List.Root>
			<Heading as="h3" size="2xl" mb="3" mt="6">
				Notfallvorsorge
			</Heading>
			<Heading as="h3" size="md" mb="3" mt="6">
				EchoSOS-App
			</Heading>
			<Text fontSize="lg">
				Wir empfehlen allen Teilnehmerinnen und Teilnehmern die kostenlose EchoSOS-App.
			</Text>
			<Text fontSize="lg">Ihre Vorteile:</Text>
			<List.Root>
				<List.Item fontSize="lg" py="1">
					Automatische Übermittlung des GPS-Standorts bei einem Notruf.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Digitaler Notfallpass mit Angaben zu Medikamenten, Allergien, Blutgruppe und
					Notfallkontakten.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					QR-Code auf dem Sperrbildschirm ermöglicht Rettungskräften den schnellen Zugriff auf
					wichtige Informationen.
				</List.Item>
				<List.Item fontSize="lg" py="1">
					Sämtliche persönlichen Daten bleiben ausschliesslich auf Ihrem Smartphone gespeichert.
				</List.Item>
			</List.Root>
			<Heading as="h3" size="md" mb="3" mt="6">
				Erste Hilfe
			</Heading>
			<Text fontSize="lg">
				Die Tourenleitung führt auf jeder Tour ein Erste-Hilfe-Set mit. Grundkenntnisse in Erster
				Hilfe sind für alle Teilnehmenden von Vorteil.
			</Text>
			<Heading as="h3" size="2xl" mb="3" mt="6">
				Organisation
			</Heading>
			<List.Root>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Kostenbeitrag:
					<Text fontWeight="normal" as="span" ml="1">
						CHF 2.00 pro Tour. Bitte möglichst passend in bar mitbringen oder bequem per TWINT
						bezahlen.
					</Text>
				</List.Item>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Anmeldung:
					<Text fontWeight="normal" as="span" ml="1">
						Für die regulären Mittwochstouren ist keine Anmeldung erforderlich. Bei Ganztages- oder
						Spezialtouren informieren wir rechtzeitig über WhatsApp, falls eine Anmeldung notwendig
						ist.
					</Text>
				</List.Item>
				<List.Item fontSize="lg" fontWeight="semibold" py="1">
					Versicherung:
					<Text fontWeight="normal" as="span" ml="1">
						Die Teilnahme erfolgt auf eigenes Risiko. Jede Teilnehmerin und jeder Teilnehmer ist
						selbst für eine ausreichende Unfall- und Privathaftpflichtversicherung verantwortlich.
					</Text>
				</List.Item>
			</List.Root>
			<Heading as="h3" size="2xl" mb="3" mt="6">
				Gemeinsam sicher unterwegs!
			</Heading>
			<Text fontSize="lg">
				Rücksichtnahme, Aufmerksamkeit und gegenseitige Unterstützung machen unsere Touren zu einem
				sicheren und schönen Erlebnis.
			</Text>
			<Text fontSize="lg">
				Wir danken Ihnen für Ihr verantwortungsbewusstes Verhalten und freuen uns auf viele
				sportliche, unfallfreie und erlebnisreiche E-Bike-Touren mit der Velogruppe 60 Plus
				Sensetal.
			</Text>
			<Text fontSize="lg" fontWeight="semibold" mt="4">
				Paul Lehmann
			</Text>
			<Text fontSize="lg">Gesamtverantwortlicher</Text>
			<Text fontSize="lg" fontWeight="semibold" mt="4">
				Peter Poffet
			</Text>
			<Text fontSize="lg">Kommunikationsverantwortlicher</Text>
			<Text fontSize="lg" fontWeight="semibold" mt="4">
				Arthur Schneuwly
			</Text>
			<Text fontSize="lg">Tourenverantwortlicher</Text>
			<Text fontSize="lg" fontWeight="semibold" mt="4">
				Beat Gruber
			</Text>
			<Text fontSize="lg">Sicherheitsverantwortlicher</Text>
		</Box>
	);
}

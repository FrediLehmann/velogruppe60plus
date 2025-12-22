import { Heading, List, Text } from '@chakra-ui/react';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Ablauf',
	description: 'Ablauf einer Fahrradtour der Velogruppe 60+ Sensetal'
};

export default function Unfallverhlaten() {
	return (
		<>
			<Heading as="h2" size="lg" mt="8" mb="4">
				Ablauf der eBike-Tour mit Tourenleitung, Gruppenleitung, Schlussmann und Patrouillendienst
			</Heading>
			<List.Root fontWeight="semibold" my="4" px="6" as="ol">
				<List.Item>
					Begrüssung und Einweisung
					<Text as="span" fontWeight="normal" ml="1">
						Die eBike-Tour beginnt mit einer freundlichen Begrüssung durch den Tourenleiter, der für
						die Gesamtkoordination und einen reibungslosen Ablauf verantwortlich ist. Nach der
						Vorstellung des Tourverlaufs und einer Sicherheitsunterweisung werden die Teilnehmenden
						in Kleingruppen eingeteilt. Jede Gruppe steht unter der Leitung eines Gruppenleiters,
						der für das Wohl und die Sicherheit der Gruppe verantwortlich zeichnet.
					</Text>
				</List.Item>
				<List.Item>
					Aufwärmphase und Gruppenbildung (ca. 10 Minuten)
					<Text as="span" fontWeight="normal" ml="1">
						Eine gemeinsame Aufwärmphase, durchgeführt von einer fachkundigen Person, dient zur
						Vorbereitung der Muskulatur auf die bevorstehende Aktivität und minimiert
						Verletzungsrisiken. Anschliessend erfolgt die endgültige Gruppenbildung in Einheiten von
						6 bis 8 Personen. Jede Gruppe wird von einem Schlussmann begleitet, der durch eine
						auffällige Warnweste identifizierbar ist und für die Sicherung des hinteren Bereichs der
						Gruppe verantwortlich ist.
					</Text>
				</List.Item>
				<List.Item>
					Start der Tour und Hauptstrecke
					<Text as="span" fontWeight="normal" ml="1">
						<Text>
							Nach einer kurzen Einweisung gibt der Tourenleiter das Startsignal, und die
							Kleingruppen setzen sich nacheinander in Bewegung. Beim Überqueren befahrener Strassen
							koordiniert der Patrouillendienst den Verkehr, um allen Teilnehmenden eine sichere
							Passage zu ermöglichen. Der Schlussmann überwacht dabei den Abschluss und stellt
							sicher, dass niemand den Anschluss verliert.
						</Text>
						<Text mt="3">
							Die anschliessende Tour führt über eine landschaftlich reizvolle Route, die
							abwechslungsreiche Eindrücke bietet. Der Tourenleiter stimmt das Tempo auf die
							individuellen Fähigkeiten der Teilnehmenden ab. Währenddessen fördern die
							Gruppenleiter die Motivation und das harmonische Miteinander in ihren Kleingruppen.
							Der Schlussmann sorgt dafür, dass die Gruppe geschlossen bleibt und alle sicher die
							Strecke bewältigen.
						</Text>
					</Text>
				</List.Item>
				<List.Item>
					Rast und Verpflegung
					<Text as="span" fontWeight="normal" ml="1">
						Nach der intensiven Etappe steht eine Pause in einem gemütlichen Restaurant auf dem
						Programm. Die Teilnehmenden können sich bei Getränken und Snacks stärken und die
						entspannte Atmosphäre geniessen. Diese Rast bietet auch eine ideale Gelegenheit, sich
						auszutauschen und neue Kontakte zu knüpfen. Der Tourenleiter achtet darauf, dass die
						Pause ausreichend lang ist, um allen eine optimale Regeneration zu ermöglichen.
					</Text>
				</List.Item>
				<List.Item>
					Rückfahrt und Ausklang
					<Text as="span" fontWeight="normal" ml="1">
						Die Rückfahrt erfolgt in einem gemässigten Tempo, damit alle die Umgebung geniessen
						können. Gruppenleiter und Schlussmänner gewährleisten weiterhin Sicherheit und ein
						harmonisches Miteinander in den Gruppen.
					</Text>
				</List.Item>
				<List.Item>
					Dehnübungen und Abschluss
					<Text as="span" fontWeight="normal" ml="1">
						Zur Förderung der Regeneration wird eine kurze Einheit mit Dehnübungen angeboten. Diese
						wird von einer geschulten Person geleitet und trägt zur Entspannung der Muskulatur bei.
					</Text>
				</List.Item>
				<List.Item>
					Verabschiedung und Ausblick auf die nächste Tour
					<Text as="span" fontWeight="normal" ml="1">
						Zum Abschluss dankt der Tourenleiter den Teilnehmenden für ihr Engagement und gibt einen
						Ausblick auf die nächste Tour, die auf der Website der Velogruppe angekündigt wird. Ein
						motivierender Schlusspunkt, der die Vorfreude auf weitere gemeinsame Erlebnisse weckt.
					</Text>
				</List.Item>
			</List.Root>
		</>
	);
}

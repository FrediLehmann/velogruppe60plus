import { Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';

export const metadata = {
	title: 'Velogruppe 60+ Sensetal | Unfallverhalten',
	description:
		'Im Falle eines Unfalls mit einem eBike gibt es einige wichtige Schritte, die Sie beachten sollten'
};

export default function Unfallverhlaten() {
	return (
		<>
			<Heading as="h2" size="lg" mt="8" mb="4">
				Unfallverhalten
			</Heading>
			<Text>
				Bei einem Unfall mit einem eBike ist ein systematisches und besonnenes Vorgehen
				entscheidend, um die Situation sicher zu bewältigen. Im Folgenden wird eine strukturierte
				Anleitung für das Verhalten im Falle eines Unfalls dargestellt.
			</Text>
			<OrderedList fontWeight="semibold" my="4" px="6">
				<ListItem>
					Ruhe bewahren und Überblick verschaffen
					<Text as="span" fontWeight="normal">
						Das eigene Verhalten hat massgeblichen Einfluss auf den weiteren Verlauf der
						Unfallbewältigung. Ruhe zu bewahren und sich zu konzentrieren, ist daher essenziell.
						Tiefe Atemzüge helfen dabei, Gedanken zu ordnen und die Situation klar zu erfassen.
					</Text>
				</ListItem>
				<ListItem>
					Notruf verständigen
					<Text as="span" fontWeight="normal">
						Im Falle von Verletzungen ist der umgehende Notruf (in der Schweiz: 144) zu
						kontaktieren. Dabei sind der Unfallort, die Art des Vorfalls sowie die Schwere der
						Verletzungen präzise zu beschreiben.
					</Text>
				</ListItem>
				<ListItem>
					Absicherung der Unfallstelle
					<Text as="span" fontWeight="normal">
						Die Unfallstelle ist, sofern möglich, abzusichern, um Folgeunfälle zu vermeiden. Dies
						kann durch das Abstellen des eBikes an einem sicheren Ort oder das Platzieren von
						Warndreiecken erfolgen.
					</Text>
				</ListItem>
				<ListItem>
					Erste Hilfe leisten
					<Text as="span" fontWeight="normal">
						Die Versorgung von Verletzten hat oberste Priorität. Blutungen sollten, soweit möglich,
						gestoppt, Verletzungen stabilisiert und betroffene Personen beruhigt werden.
						Gleichzeitig ist darauf zu achten, die eigene Sicherheit nicht zu gefährden.
					</Text>
				</ListItem>
				<ListItem>
					Unterstützung annehmen
					<Text as="span" fontWeight="normal">
						Hilfsangebote von anwesenden Personen sollten dankbar angenommen werden. Diese
						Unterstützung kann bei der Absicherung, der Ersthilfe oder der Alarmierung des
						Rettungsdienstes von entscheidender Bedeutung sein.
					</Text>
				</ListItem>
				<ListItem>
					Anleitung durch Fachkräfte folgen
					<Text as="span" fontWeight="normal">
						Nach Eintreffen der Rettungskräfte ist es wichtig, deren Anweisungen zu folgen. Diese
						sind speziell geschult und in der Lage, die Situation optimal zu beurteilen und
						entsprechende Massnahmen einzuleiten.
					</Text>
				</ListItem>
				<ListItem>
					Dokumentation des Unfalls
					<Text as="span" fontWeight="normal">
						Zur späteren Klärung ist eine umfassende Dokumentation ratsam:
						<UnorderedList>
							<ListItem>Fotos der Unfallstelle, des eBikes und etwaiger Schäden.</ListItem>
							<ListItem>
								Notizen zu relevanten Details wie Unfallzeit, Wetterbedingungen und den genauen
								Hergang.
							</ListItem>
						</UnorderedList>
					</Text>
				</ListItem>
				<ListItem>
					Meldung an Polizei und Versicherung
					<Text as="span" fontWeight="normal">
						Bei schweren Unfällen, Personenschäden oder erheblichen Sachschäden ist die Polizei (in
						der Schweiz: 117) zu verständigen, um ein Unfallprotokoll zu erstellen. Dieses Dokument
						ist später für die Schadensregulierung erforderlich. Ebenso ist die Versicherung zeitnah
						zu informieren, wobei alle relevanten Unterlagen bereitzuhalten sind.
					</Text>
				</ListItem>
			</OrderedList>
			<Text>
				Eine klare Struktur und umsichtiges Handeln im Falle eines eBike-Unfalls sind essenziell, um
				Verletzungen zu minimieren und die Klärung des Vorfalls zu unterstützen. Die oben genannten
				Schritte bieten einen praktischen Leitfaden, der sowohl Sicherheit als auch Effizienz
				gewährleistet.
			</Text>
			<Heading as="h3" size="md" mt="8" mb="4">
				Fortsetzung einer eBike-Tour nach einem Unfall
			</Heading>
			<Text>
				Nach einem Unfall während einer eBike-Tour sollten alle Beteiligten zunächst sicherstellen,
				dass sie sich an einem sicheren Ort befinden und keine Verletzungen vorliegen. Bei
				Verletzungen ist sofort medizinische Hilfe zu rufen. Wenn niemand verletzt ist, sollte das
				beschädigte eBike gesichert oder transportiert werden. Bei einem Unfall mit einem anderen
				Fahrzeug ist die Polizei zu verständigen und eine Unfallmeldung auszufüllen. Alle
				Beteiligten sollten ihre Kontaktdaten und Versicherungsinformationen austauschen.
			</Text>
			<Text mt="3">
				Entscheiden sich die Teilnehmer, die Tour fortzusetzen, müssen sie auf Sicherheit achten,
				die Verkehrsregeln befolgen und aufeinander achten. Eine gute Kommunikation und Koordination
				sind wichtig, um die Tour verantwortungsbewusst und sicher fortzusetzen.
			</Text>
			<Heading as="h3" size="md" mt="8" mb="4">
				EchoSOS: Notfall-App zur Sicherheitsunterstützung
			</Heading>
			<Text>
				EchoSOS ist eine mobile Anwendung, die es Nutzern ermöglicht, im Notfall direkt den Notruf
				zu kontaktieren und automatisch den Standort zu übermitteln, um Einsatzkräfte schneller zu
				führen. Sie ist besonders nützlich für Menschen in abgelegenen Gebieten oder mit
				gesundheitlichen Einschränkungen, die Schwierigkeiten haben könnten, selbst den Notruf zu
				wählen. Dennoch ersetzt EchoSOS nicht den Notruf (Schweiz: 144) und sollte als ergänzende
				Sicherheitsmaßnahme betrachtet werden.
			</Text>
			<Heading as="h3" size="md" mt="8" mb="4">
				Verhaltenskodex nach einem Unfall
			</Heading>
			<Text>Nach einem Unfall sollten folgende Verhaltensregeln beachtet werden:</Text>
			<OrderedList fontWeight="semibold" my="4" px="6">
				<ListItem>
					Sicherheit gewährleisten:
					<Text as="span" fontWeight="normal">
						Stellen Sie sicher, dass alle Beteiligten in Sicherheit sind und holen Sie
						gegebenenfalls medizinische Hilfe.
					</Text>
				</ListItem>
				<ListItem>
					Unfall melden:
					<Text as="span" fontWeight="normal">
						Informieren Sie die Polizei und/oder den Unfallversicherer.
					</Text>
				</ListItem>
				<ListItem>
					Beweissicherung:
					<Text as="span" fontWeight="normal">
						Machen Sie Fotos von der Unfallstelle und sichern Sie relevante Beweise.
					</Text>
				</ListItem>
				<ListItem>
					Keine Schuldzuweisungen:
					<Text as="span" fontWeight="normal">
						Vermeiden Sie Vorwürfe und Schuldzuweisungen.
					</Text>
				</ListItem>
				<ListItem>
					Kooperation:
					<Text as="span" fontWeight="normal">
						Arbeiten Sie mit den Ermittlungsbehörden und Versicherungen zusammen, um den Unfall
						schnell aufzuklären.
					</Text>
				</ListItem>
			</OrderedList>
			<Text fontWeight="semibold">
				Diese Regeln helfen, den Unfall sachgerecht zu klären und Konflikte zu vermeiden.
			</Text>
		</>
	);
}

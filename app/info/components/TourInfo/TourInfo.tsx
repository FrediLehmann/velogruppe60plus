'use client';

import { Box, Flex, Grid, GridItem, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { FiArrowRight, FiClock, FiExternalLink, FiMessageCircle } from 'react-icons/fi';

export default function TourInfo() {
	return (
		<Box as="section">
			<Heading as="h2" size="xl" color="green.800">
				Touren
			</Heading>
			<Heading as="h2" size="3xl" mb="3">
				Was muss ich wissen?
			</Heading>
			<Text fontSize="lg">
				Über 100 Touren im Freiburger Land & Berner Mittelland. Jeden Mittwoch entdecken wir
				abwechslungsreiche Routen – von einem halben bis ganzen Tag. Bewegung, Natur und
				Gemeinschaft stehen im Mittelpunkt!
			</Text>
			<Grid mt="8" templateColumns={['1fr', 'repeat(2, 1fr)']} gap="6">
				<GridItem>
					<Flex gap="4">
						<Flex background="green.fg" w="50px" h="50px" borderRadius="lg" color="white">
							<Text fontSize="lg" fontWeight="bold" m="auto">
								Mi
							</Text>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								Jeden Mittwoch unterwegs
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>
								Die Touren starten am 15. April 2026 und finden danach wöchentlich jeden Mittwoch
								statt
							</Text>
						</Box>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex gap="4">
						<Flex background="green.fg" w="50px" h="50px" borderRadius="lg" color="white">
							<Text fontSize="lg" fontWeight="bold" m="auto">
								99
								<Text as="sup" fontWeight="bold">
									+
								</Text>
							</Text>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								Über 100 Touren
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>Woche für Woche ein neues Erlebnis.</Text>
							<Link href="/alle-touren" display="block" mt="2" color="green.700">
								Touren ansehen{' '}
								<Icon boxSize="4">
									<FiArrowRight />
								</Icon>
							</Link>
						</Box>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex gap="4">
						<Flex
							background="green.fg"
							w="50px"
							h="50px"
							borderRadius="lg"
							justifyContent="center"
							color="white">
							<Icon boxSize="6" strokeWidth="3" my="auto">
								<FiClock />
							</Icon>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								Halb- und Ganztagestouren
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>
								Die Touren umfassen entweder 35 bis 50 Kilometer für Halbtagesausflüge oder 60 bis
								70 Kilometer für Ganztagestouren.
							</Text>
						</Box>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex gap="4">
						<Flex
							background="green.fg"
							w="50px"
							h="50px"
							borderRadius="lg"
							justifyContent="center"
							color="white">
							<Icon boxSize="6" strokeWidth="3" my="auto">
								<FiMessageCircle />
							</Icon>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								WhatsApp Gruppe
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>
								Die Gruppe dient dazu die Teilnehmer über Änderungen zu informieren.
							</Text>
							<Link
								href="https://chat.whatsapp.com/BRNlcAM9NttJzwiZ0IrotS"
								display="block"
								mt="2"
								color="green.700"
								target="_blank">
								Der WhatsApp-Gruppe beitreten{' '}
								<Icon mx="2px" boxSize="4">
									<FiExternalLink />
								</Icon>
							</Link>
						</Box>
					</Flex>
				</GridItem>
			</Grid>
		</Box>
	);
}

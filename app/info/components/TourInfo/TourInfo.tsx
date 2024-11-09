'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';

import { ArrowRight, Clock, External, MessageCircle } from '@/icons';

export default function TourInfo() {
	return (
		<Box as="section">
			<Heading as="h2" size="md" color="green.800">
				Touren
			</Heading>
			<Heading as="h2" size="lg" mb="3">
				Was muss ich wissen?
			</Heading>
			<Text fontSize="lg">
				Jede Woche fahren wir auf eine von über 50 Touren, die durch das schöne Freiburgerland und
				den benachbarten Kanton Bern führen. Dabei sind wir einen halben bis ganzen Tag unterwegs.
			</Text>
			<Grid mt="8" templateColumns={['1fr', 'repeat(2, 1fr)']} gap="6">
				<GridItem>
					<Flex gap="4">
						<Flex background="green.600" w="50px" h="50px" borderRadius="lg" color="white">
							<Text fontSize="lg" fontWeight="bold" m="auto">
								Mi
							</Text>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								Jeden Mittwoch
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>
								Ab dem 24. April 2024 finden die Touren jeden Mittwoch statt.
							</Text>
						</Box>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex gap="4">
						<Flex background="green.600" w="50px" h="50px" borderRadius="lg" color="white">
							<Text fontSize="lg" fontWeight="bold" m="auto">
								50
								<Text as="sup" fontWeight="bold">
									+
								</Text>
							</Text>
						</Flex>
						<Box>
							<Text fontSize="lg" fontWeight="semibold">
								Über 50 Touren
							</Text>
							<Text maxW={['30ch', '22ch', '30ch']}>
								Jede Woche wird eine andere von über 50 verfügbaren Touren gefahren.
							</Text>
							<Link href="/alle-touren" display="block" mt="2" color="green.700">
								Touren ansehen <ArrowRight boxSize="4" />
							</Link>
						</Box>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex gap="4">
						<Flex
							background="green.600"
							w="50px"
							h="50px"
							borderRadius="lg"
							justifyContent="center"
							color="white">
							<Clock boxSize="6" strokeWidth="3" my="auto" />
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
							background="green.600"
							w="50px"
							h="50px"
							borderRadius="lg"
							justifyContent="center"
							color="white">
							<MessageCircle boxSize="6" strokeWidth="3" my="auto" />
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
								isExternal>
								Der WhatsApp-Gruppe beitreten <External mx="2px" boxSize="4" />
							</Link>
						</Box>
					</Flex>
				</GridItem>
			</Grid>
		</Box>
	);
}

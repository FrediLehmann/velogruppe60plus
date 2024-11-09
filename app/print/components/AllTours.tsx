'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { Tour } from '@/types/Tours.types';

type Tours = Omit<
	Tour,
	| 'pause'
	| 'distance'
	| 'ascent'
	| 'descent'
	| 'duration'
	| 'next_tour'
	| 'image_data'
	| 'published'
>[];

export default function AllTours({ tours }: { tours: Tours }) {
	return (
		<Box as="main">
			{tours.map((tour) => (
				<Box as="article" key={tour.id} py="3">
					<Box as="header">
						<Heading as="h2" size="md" my="4">
							{tour.name}
						</Heading>
					</Box>
					<Box as="main">
						<Flex wrap="wrap" gap="4" my="2">
							<Flex align="center" gap="1" fontSize={['sm', 'md']}>
								<Text fontWeight="light">Startort:</Text>
								<Text fontWeight="semibold">{tour.startPoint}</Text>
							</Flex>
							<Flex align="center" gap="1" fontSize={['sm', 'md']}>
								<Text fontWeight="light">Zielort:</Text>
								<Text fontWeight="semibold">{tour.endPoint}</Text>
							</Flex>
						</Flex>
						<Box>
							<Heading as="span" size="sm">
								Wegbeschreibung:
							</Heading>
							<Text>{tour.route}</Text>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
}

'use client';

import { Link } from '@chakra-ui/next-js';
import { AspectRatio, Box, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { External } from '@/icons';
import { createClient } from '@/lib/supabase/client';
import { Tour } from '@/types/Tours.types';

import { Fact } from './components';

export default function TourView({ tour }: { tour: Tour }) {
	const supabase = createClient();

	return (
		<>
			<Flex
				mt={['4', '6']}
				mb={['6', '10']}
				gap="8"
				flexDirection={['column', 'row']}
				align="flex-start">
				<Box>
					<Text fontSize={['lg', 'xl']} whiteSpace="pre-wrap" mb="4">
						{tour.description}
					</Text>
					{tour.route && (
						<>
							<Heading as="span" size="sm">
								Wegbeschreibung:
							</Heading>
							<Text fontSize={['lg', 'xl']} whiteSpace="pre-wrap">
								{tour.route}
							</Text>
						</>
					)}
				</Box>
				<Flex gap={['6', '8']} wrap="wrap" minW="40">
					<Fact label="Distanz" value={tour.distance} />
					<Fact label="Aufstieg" value={tour.ascent} />
					<Fact label="Abstieg" value={tour.descent} />
					<Fact label="Dauer" value={tour.duration} />
					<Fact label="Start" value={tour.startPoint} />
					<Fact label="Ziel" value={tour.endPoint} />
					<Fact label="Kaffeepause" value={tour.pause} />
				</Flex>
			</Flex>
			<Link href={tour.mapUrl} display="block" my="2" isExternal color="green.700">
				Auf Schweiz Mobil anschauen <External mx="2px" boxSize="4" />
			</Link>
			<AspectRatio
				maxW="736px"
				ratio={tour.image_data.width / tour.image_data.height}
				borderRadius="sm">
				<Image
					src={
						supabase.storage.from('map-images').getPublicUrl(tour.image_data.path).data.publicUrl
					}
					fill
					sizes="(min-width: 768px) 736px, 100vw"
					alt="Bild der Karte"
				/>
			</AspectRatio>
		</>
	);
}

'use client';

import { AspectRatio, Box, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

import { GpxDownloadButton, LeafletMap } from '@/components';
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
			{tour.map_data?.gpxPath ? (
				<>
					<Flex gap="4" align="center" my="4">
						<Link href={tour.mapUrl} target="_blank" color="green.700">
							Auf Schweiz Mobil anschauen{' '}
							<Icon mx="2px" boxSize="4">
								<FiExternalLink />
							</Icon>
						</Link>
						<GpxDownloadButton gpxFilePath={tour.map_data.gpxPath} tourName={tour.name} />
					</Flex>
					<LeafletMap gpxFilePath={tour.map_data.gpxPath} />
				</>
			) : tour.image_data ? (
				<>
					<Link href={tour.mapUrl} display="block" my="2" target="_blank" color="green.700">
						Auf Schweiz Mobil anschauen{' '}
						<Icon mx="2px" boxSize="4">
							<FiExternalLink />
						</Icon>
					</Link>
					<AspectRatio
						maxW="736px"
						ratio={tour.image_data.width / tour.image_data.height}
						borderRadius="sm">
						<Image
							src={
								supabase.storage.from('map-images').getPublicUrl(tour.image_data.path).data
									.publicUrl
							}
							fill
							sizes="(min-width: 768px) 736px, 100vw"
							alt="Bild der Karte"
						/>
					</AspectRatio>
				</>
			) : null}
		</>
	);
}

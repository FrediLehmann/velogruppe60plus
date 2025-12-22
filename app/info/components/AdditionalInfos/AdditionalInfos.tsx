'use client';

import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';

import { TrackClickEvent } from '@/components';
import { ArrowRight } from '@/icons';

export default function AdditionalInfos() {
	return (
		<Box>
			<Heading as="h2" size="md" color="green.800">
				Links
			</Heading>
			<Heading as="h2" size="lg" mb="3">
				Wo finde ich weitere Informationen?
			</Heading>
			<Flex flexDirection={['column', 'row']} gap={['2', '6']}>
				<TrackClickEvent event={{ name: 'TIMELINE_PAGE_LINK_CLICK' }}>
					<Button href="/ablauf" as={Link}>
						Ablauf
						<ArrowRight boxSize="5" />
					</Button>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'ACCIDENT_PAGE_LINK_CLICK' }}>
					<Button href="/unfallverhalten" as={Link}>
						Unfallverhalten
						<ArrowRight boxSize="5" />
					</Button>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'EBIKE_PAGE_LINK_CLICK' }}>
					<Button href="/e-bikes" as={Link}>
						Gesetzliche Regelung E-Bikes
						<ArrowRight boxSize="5" />
					</Button>
				</TrackClickEvent>
			</Flex>
		</Box>
	);
}

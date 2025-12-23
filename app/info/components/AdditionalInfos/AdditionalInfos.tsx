'use client';

import { Box, Flex, Heading, Icon, Link } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { TrackClickEvent } from '@/components';

export default function AdditionalInfos() {
	return (
		<Box>
			<Heading as="h2" size="xl" color="green.800">
				Links
			</Heading>
			<Heading as="h2" size="3xl" mb="3">
				Wo finde ich weitere Informationen?
			</Heading>
			<Flex flexDirection={['column', 'row']} gap={['2', '6']}>
				<TrackClickEvent event={{ name: 'TIMELINE_PAGE_LINK_CLICK' }}>
					<Link href="/ablauf">
						Ablauf
						<Icon boxSize="5">
							<FiArrowRight />
						</Icon>
					</Link>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'ACCIDENT_PAGE_LINK_CLICK' }}>
					<Link href="/unfallverhalten">
						Unfallverhalten
						<Icon boxSize="5">
							<FiArrowRight />
						</Icon>
					</Link>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'EBIKE_PAGE_LINK_CLICK' }}>
					<Link href="/e-bikes">
						Gesetzliche Regelung E-Bikes
						<Icon boxSize="5">
							<FiArrowRight />
						</Icon>
					</Link>
				</TrackClickEvent>
			</Flex>
		</Box>
	);
}

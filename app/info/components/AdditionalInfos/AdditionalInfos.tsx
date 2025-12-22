'use client';

import { Box, Button, Flex, Heading, Icon, Link } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { TrackClickEvent } from '@/components';

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
					<Button asChild>
						<Link href="/ablauf">
							Ablauf
							<Icon boxSize="5">
								<FiArrowRight />
							</Icon>
						</Link>
					</Button>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'ACCIDENT_PAGE_LINK_CLICK' }}>
					<Button asChild>
						<Link href="/unfallverhalten">
							Unfallverhalten
							<Icon boxSize="5">
								<FiArrowRight />
							</Icon>
						</Link>
					</Button>
				</TrackClickEvent>
				<TrackClickEvent event={{ name: 'EBIKE_PAGE_LINK_CLICK' }}>
					<Button asChild>
						<Link href="/e-bikes">
							Gesetzliche Regelung E-Bikes
							<Icon boxSize="5">
								<FiArrowRight />
							</Icon>
						</Link>
					</Button>
				</TrackClickEvent>
			</Flex>
		</Box>
	);
}

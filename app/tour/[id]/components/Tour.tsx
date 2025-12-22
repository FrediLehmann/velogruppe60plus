'use client';

import { Button, Container, Heading, Link } from '@chakra-ui/react';
import { useContext } from 'react';

import { TourView, TrackClickEvent } from '@/components';
import { ArrowLeft } from '@/icons';
import { TourContext } from '@/lib/contexts/TourContext';

export default function Tour() {
	const { tour } = useContext(TourContext);

	return (
		<Container as="main" maxW="container.md" mt={['4', '6', '12']}>
			<TrackClickEvent event={{ name: 'NAVIGATE_BACK_TO_ALL_TOURS_BUTTON_CLICK' }}>
				<Button asChild mb="4" color="green.700" alignItems="center">
					<Link href="/alle-touren">
						<ArrowLeft boxSize="5" />
						Zurück zu den Touren
					</Link>
				</Button>
			</TrackClickEvent>
			<Heading as="h1" fontSize={['xl', '2xl']}>
				{tour.name}
			</Heading>
			<TourView tour={tour} />
		</Container>
	);
}

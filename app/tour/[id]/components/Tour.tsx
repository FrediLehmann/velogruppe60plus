'use client';

import { Container, Heading, Icon, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { TourView, TrackClickEvent } from '@/components';
import { TourContext } from '@/lib/contexts/TourContext';

export default function Tour() {
	const { tour } = useContext(TourContext);

	return (
		<Container as="main" p="0" maxW="768px" mt={['4', '6', '12']}>
			<TrackClickEvent event={{ name: 'NAVIGATE_BACK_TO_ALL_TOURS_BUTTON_CLICK' }}>
				<Link href="/alle-touren" mb="4" color="green.700" alignItems="center">
					<Icon boxSize="5">
						<FiArrowLeft />
					</Icon>
					Zurück zu den Touren
				</Link>
			</TrackClickEvent>
			<Heading as="h1" fontSize={['xl', '2xl']}>
				{tour.name}
			</Heading>
			<TourView tour={tour} />
		</Container>
	);
}

'use client';

import { Heading, Skeleton, Text } from '@chakra-ui/react';
import { useContext } from 'react';

import { TourView } from '@/components';
import { TourContext } from '@/lib/contexts/TourContext';

import { TourDate } from './components';

export default function CurrentTour() {
	const { tour } = useContext(TourContext);

	if (!tour) return <Skeleton h="xl" w="full"></Skeleton>;

	return (
		<>
			<Text fontSize="sm" fontWeight="semibold" color="gray.700">
				Nächste Tour
			</Text>
			<Heading as="h1" fontSize={['xl', '2xl']}>
				{tour.name}
			</Heading>
			<TourDate />
			<TourView tour={tour} />
		</>
	);
}

'use client';

import { Box, ButtonGroup, Flex, Icon, Separator, Text } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import { AdminTourListContext } from '@/lib/contexts/AdminTourListContext';

import { EditTourDate, ToggleTourDate } from './components';

export default function NextTourSection() {
	const { tourDate } = useContext(AdminTourListContext);

	const date = useMemo(() => {
		if (!tourDate.tour_date) return;
		return new Intl.DateTimeFormat('de-ch', {
			dateStyle: 'full',
			timeStyle: 'short',
			timeZone: 'Europe/Zurich'
		}).format(new Date(tourDate.tour_date));
	}, [tourDate.tour_date]);

	return (
		<Box as="section" mb="10">
			<Text fontSize="xl" fontWeight="semibold">
				Datum für die Nächste Tour
			</Text>
			<Separator borderColor="gray.500" my="3" />
			{tourDate.is_canceled && (
				<Flex
					px="4"
					py="2"
					gap="6"
					background="red.50"
					border="1px solid"
					borderColor="red.100"
					borderRadius="sm"
					alignItems="center">
					<Icon boxSize="6">
						<FiAlertTriangle />
					</Icon>
					<Text fontSize="lg" fontWeight="semibold">
						Abgesagt
					</Text>
				</Flex>
			)}
			<Flex my="6" gap="6" alignItems="center">
				<Box>
					<Text fontSize="sm" fontWeight="semibold">
						Nächste Tour am:
					</Text>
					<Text fontSize="lg">{date}</Text>
				</Box>
				<Box>
					<Text fontSize="sm" fontWeight="semibold">
						Tourlänge:
					</Text>
					<Text fontSize="lg">{tourDate.halfday_tour ? 'Halbtagestour' : 'Ganztagestour'}</Text>
				</Box>
			</Flex>
			<ButtonGroup>
				<EditTourDate />
				<ToggleTourDate id={tourDate.id} isCanceled={tourDate.is_canceled} />
			</ButtonGroup>
		</Box>
	);
}

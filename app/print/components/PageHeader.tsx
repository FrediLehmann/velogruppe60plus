'use client';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { TrackClickEvent } from '@/components';
import { Print } from '@/icons';

export default function PageHeader() {
	function printPage() {
		window.print();
	}

	return (
		<Flex as="header" justifyContent="space-between" align="center">
			<Box>
				<Text
					fontSize="md"
					fontWeight="semibold"
					color="gray.700"
					sx={{ '@media print': { display: 'none' } }}>
					Alle Touren
				</Text>
				<Heading as="h1" size="lg" mb="6">
					Velogruppe 60+ Sensetal
				</Heading>
			</Box>
			<TrackClickEvent event={{ name: 'PRINT_TOURS_BUTTON_CLICK' }}>
				<Button onClick={printPage} sx={{ '@media print': { display: 'none' } }}>
					<Print boxSize="5" />
					Jetzt Drucken
				</Button>
			</TrackClickEvent>
		</Flex>
	);
}

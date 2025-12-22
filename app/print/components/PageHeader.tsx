'use client';

import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FiPrinter } from 'react-icons/fi';

import { TrackClickEvent } from '@/components';

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
					css={{ '@media print': { display: 'none' } }}>
					Alle Touren
				</Text>
				<Heading as="h1" size="lg" mb="6">
					Velogruppe 60+ Sensetal
				</Heading>
			</Box>
			<TrackClickEvent event={{ name: 'PRINT_TOURS_BUTTON_CLICK' }}>
				<Button onClick={printPage} css={{ '@media print': { display: 'none' } }}>
					<Icon boxSize="5">
						<FiPrinter />
					</Icon>
					Jetzt Drucken
				</Button>
			</TrackClickEvent>
		</Flex>
	);
}

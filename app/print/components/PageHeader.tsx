'use client';

import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FiPrinter } from 'react-icons/fi';

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
				<Heading as="h1" size="3xl" mb="6">
					Velogruppe 60+ Sensetal
				</Heading>
			</Box>
			<Button
				onClick={printPage}
				variant="subtle"
				bgColor="bgGray.100"
				_hover={{ background: 'bgGray.200' }}
				css={{ '@media print': { display: 'none' } }}>
				<Icon boxSize="5">
					<FiPrinter />
				</Icon>
				Jetzt Drucken
			</Button>
		</Flex>
	);
}

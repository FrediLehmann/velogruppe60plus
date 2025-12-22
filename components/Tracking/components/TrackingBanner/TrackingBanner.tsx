'use client';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface TrackingBannerProps {
	onAccept: () => void;
	onDecline: () => void;
}

export function TrackingBanner({ onAccept, onDecline }: TrackingBannerProps) {
	return (
		<Box
			position="fixed"
			bottom={[5]}
			right={[4]}
			maxWidth="xl"
			mb={[5]}
			px={[4]}
			py={[3]}
			background="gray.50"
			borderWidth="1px"
			borderRadius="md"
			borderColor="gray.300"
			boxShadow="lg"
			zIndex="toast"
			css={{ '@media print': { display: 'none' } }}>
			<Text>
				Wir nutzen Tracking um die Nutzung unserer Website zu analysieren und zu verbessern. Sie
				können die Nutzung von Tracking hier akzeptieren oder ablehnen.
			</Text>
			<Flex mt="4" gap="2">
				<Button colorPalette="mapGreen" onClick={onAccept}>
					Teilnehmen
				</Button>
				<Button onClick={onDecline}>Nicht Teilnehmen</Button>
			</Flex>
		</Box>
	);
}

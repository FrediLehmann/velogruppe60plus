'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

import { AlertTriangle } from '@/icons';

export default function TourCanceled({ tourDate = '' }: { tourDate?: string }) {
	return (
		<Flex
			mt="4"
			px="4"
			py="2"
			gap="6"
			background="red.50"
			border="1px solid"
			borderColor="red.100"
			borderRadius="sm"
			alignItems="center">
			<AlertTriangle boxSize={['8', '10']} />
			<Box>
				<Text fontSize="sm" fontWeight="semibold" color="gray.700">
					Tour abgesagt
				</Text>
				<Text fontSize={['md', 'lg']} fontWeight="bold">
					{tourDate.split('um')[0]}
				</Text>
			</Box>
		</Flex>
	);
}

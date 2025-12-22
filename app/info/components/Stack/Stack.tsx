'use client';

import { VStack } from '@chakra-ui/react';

export default function Stack({ children }: { children: React.ReactNode }) {
	return (
		<VStack gap={['12', '16', '24']} align="stretch" pb="12">
			{children}
		</VStack>
	);
}

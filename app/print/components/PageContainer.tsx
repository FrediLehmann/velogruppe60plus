'use client';

import { Box } from '@chakra-ui/react';

export default function PageContainer({ children }: { children: React.ReactNode }) {
	return (
		<Box my="8" sx={{ '@media print': { mt: '4' } }}>
			{children}
		</Box>
	);
}

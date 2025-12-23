'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { ColorModeProvider } from './color-mode';
import { customConfig } from './theme';

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={customConfig}>
			<ColorModeProvider>{children}</ColorModeProvider>
		</ChakraProvider>
	);
}

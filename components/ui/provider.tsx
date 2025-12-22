'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { customConfig } from './theme';

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={customConfig}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	);
}

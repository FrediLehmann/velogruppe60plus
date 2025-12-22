import { createSystem, defaultConfig } from '@chakra-ui/react';

export const customConfig = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				mapGreen: {
					50: { value: '#F8F9F0' },
					100: { value: '#DDE4C6' },
					200: { value: '#CBDAB1' },
					300: { value: '#B8CF9D' },
					400: { value: '#A2C389' },
					500: { value: '#8BB775' },
					600: { value: '#6DA165' },
					700: { value: '#568B5B' },
					800: { value: '#477555' },
					900: { value: '#385E4C' },
					950: { value: '#2C4A3C' }
				}
			}
		},
		recipes: {
			button: {
				base: {
					borderRadius: 'sm'
				}
			},
			input: {
				variants: {
					outline: {
						field: {
							bg: 'white',
							borderRadius: 'sm'
						}
					}
				}
			}
		}
	},
	globalCss: {
		body: {
			bg: 'gray.50'
		}
	}
});

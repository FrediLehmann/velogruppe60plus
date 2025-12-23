import { Container } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { PageFrame } from '@/components';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body>
				<Provider>
					<PageFrame>
						<Container as="main" maxW="768px" px="4" mt={['4', '6', '12']}>
							{children}
						</Container>
					</PageFrame>
					<Toaster />
				</Provider>
				<SpeedInsights />
			</body>
		</html>
	);
}

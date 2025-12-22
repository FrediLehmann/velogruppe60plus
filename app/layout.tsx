import { Container } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

import { PageFrame, Tracking } from '@/components';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body>
				<Script
					src="https://www.tellytics.ch/script/tellytics.min.js"
					type="module"
					data-tellytics="e344db29-d13a-41cf-ab25-5d75fca3b810"
				/>
				<Provider>
					<PageFrame>
						<Container as="main" maxW="container.md" mt={['4', '6', '12']}>
							{children}
						</Container>
					</PageFrame>
					<Toaster />
					<Tracking />
				</Provider>
				<SpeedInsights />
			</body>
		</html>
	);
}

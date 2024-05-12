import Script from 'next/script';
import { Container } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { PageFrame, Providers, Tracking } from '@/components';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Script
          src="https://www.tellytics.ch/script/tellytics.min.js"
          type="module"
          data-tellytics="e344db29-d13a-41cf-ab25-5d75fca3b810"
        />
        <Providers>
          <PageFrame>
            <Container as="main" maxW="container.md" mt={['4', '6', '12']}>
              {children}
            </Container>
          </PageFrame>
          <Tracking />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

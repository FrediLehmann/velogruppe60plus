import Script from 'next/script';
import { Inter } from 'next/font/google';

import { PageFrame, Providers } from './components';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Script
          src="https://www.tellytics.ch/script/tellytics.min.js"
          type="module"
          data-tellytics="e344db29-d13a-41cf-ab25-5d75fca3b810"
        />
        <Providers>
          <PageFrame>{children}</PageFrame>
        </Providers>
      </body>
    </html>
  );
}

import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import Head from 'next/head';

import { Database } from 'types/Database.types';
import theme from 'lib/theme';
import { Tracking } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  useEffect(() => {
    async function registerServiceWorker() {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (e) {
        console.error('Service Worker registration failed', e);
      }
    }

    if ('serviceWorker' in navigator) registerServiceWorker();
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Script
        src="https://www.tellytics.ch/script/tellytics.min.js"
        type="module"
        data-tellytics="e344db29-d13a-41cf-ab25-5d75fca3b810"
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
      <Analytics />
      <Tracking />
    </>
  );
}

import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

import { Database } from 'types/Database.types';
import theme from 'lib/theme';
import { Tracking } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <>
      <Script
        src="https://tellytics.vercel.app/public/tellytics.min.js"
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

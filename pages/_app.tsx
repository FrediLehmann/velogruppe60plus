import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

import { Database } from 'types/Database.types';
import theme from 'lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E1N4BTYCY0"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-E1N4BTYCY0');
        `}
      </Script>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
      <Analytics />
    </>
  );
}

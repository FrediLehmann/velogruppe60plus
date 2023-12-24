import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
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
      </Head>
      <body>
        <Script
          src="/tellytics.min.js"
          data-tellytics-tracking-id="ef563f39-aa47-4d8c-b53f-c3265a49f90d"
          type="module"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

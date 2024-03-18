import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body>
        <Script
          src="/tellytics.min.js"
          data-tellytics="ef563f39-aa47-4d8c-b53f-c3265a49f90d"
          type="module"
          strategy="lazyOnload"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

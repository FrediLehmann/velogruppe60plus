import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body>
        <Script
          src="https://tellytics.vercel.app/public/tellytics.min.js"
          type="module"
          data-tellytics="e344db29-d13a-41cf-ab25-5d75fca3b810"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

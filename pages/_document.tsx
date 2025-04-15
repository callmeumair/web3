import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://*.ethereum.org https://*.infura.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.ethereum.org https://*.infura.io; frame-src 'self' https://*.ethereum.org; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; block-all-mixed-content; upgrade-insecure-requests;" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 
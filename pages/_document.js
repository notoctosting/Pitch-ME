import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="DoseOfE - Genius Generation"
          key="title"
        />
        <meta
          property="og:description"
          content="DoseOfE - Genius Generation"
          key="description"
        />
        <meta property="og:image" content="../assets/EDOSE.jpg" />
        <meta name="twitter:card" content="./assets/EDOSE.jpg"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

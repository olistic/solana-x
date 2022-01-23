import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText } from '../stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            crossOrigin=""
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Mono&family=Poppins:wght@500&family=Source+Sans+Pro:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: getCssText() }}
            id="stitches"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

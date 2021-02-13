import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="b6BJLQnbDvN130az4qbr0au52xEmKPLMxuElH1X_zVI" />
        </Head>
        <body>
          <script src={`/scripts/noflash.js`}/>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

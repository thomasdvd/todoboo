import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  Head,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html data-theme="halloween">
        <Head />
        <title>BOOOOOOO</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

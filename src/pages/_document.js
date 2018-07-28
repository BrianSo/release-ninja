import Document, { Head, Main, NextScript } from 'next/document'
import htmlescape from 'htmlescape'
import { getEnvironment } from "../utils/crossSideUtils";

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx);
  }
  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: '__DEV__ = ' + htmlescape(getEnvironment()) }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}

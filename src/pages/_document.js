import Document, { Head, Main, NextScript } from 'next/document'
import htmlescape from 'htmlescape'
import CrossSideUtils from '../utils/CrossSideUtils';
import { useStaticRendering } from 'mobx-react';
useStaticRendering(true);

export default class MyDocument extends Document {

  // executed on server side only
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx);
  }

  // executed on server side only
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          {/*<script*/}
            {/*dangerouslySetInnerHTML={{ __html: '__PROVIDE__ = ' + htmlescape(this.props.provides) }}*/}
          {/*/>*/}
          <NextScript />
        </body>
      </html>
    )
  }
}

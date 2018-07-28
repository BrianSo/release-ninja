import App, { Container } from 'next/app';
import Head from 'next/head'
import React from 'react'
import { Provider } from 'mobx-react';
import * as crossSideUtils from '../utils/crossSideUtils';

export default class MyApp extends App {

  static async getInitialProps ({ Component, router, ctx }) {
    console.log("APP getInitialProps");
    const isServer = !!ctx.req;

    ctx.env = crossSideUtils.getEnvironment();
    ctx.client = crossSideUtils.getApiClient(ctx);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      client: ctx.client,
      env: ctx.env,
    };
  }

  render () {
    const {Component, pageProps} = this.props;
    return (
      <Provider
        client={crossSideUtils.getApiClient({})}
        env={crossSideUtils.getEnvironment({})}
      >
        <Container>
          <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          </Head>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

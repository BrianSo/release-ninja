import App, { Container } from 'next/app';
import Head from 'next/head'
import React from 'react'
import { Provider } from 'mobx-react';
import CrossSideUtils from '../utils/CrossSideUtils';
import providers from '../utils/providers';

export default class MyApp extends App {

  // executed on both server side and client side
  static async getInitialProps ({ Component, router, ctx }) {
    console.log("APP getInitialProps");
    const isServer = !!ctx.req;
    const crossSideUtils = CrossSideUtils.getInstance(ctx, providers);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      isProvideFromServer: isServer,
      provides: isServer ? crossSideUtils.serialize() : crossSideUtils.ctx.provides,
    };
  }

  render () {
    const {Component, isProvideFromServer, provides, pageProps} = this.props;
    const crossSideUtils = CrossSideUtils.getInstance({ provides }, providers);

    return (
      <Provider
        env={crossSideUtils.get('env')}
        client={crossSideUtils.get('client')}
      >
        <Container>
          <Head>
            <title>My page title</title>
          </Head>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

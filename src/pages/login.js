import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import { inject } from 'mobx-react';
import CrossSideUtils from "../utils/CrossSideUtils";

export default class extends Component{

  static async getInitialProps (ctx) {
    const crossSideUtils = CrossSideUtils.getInstance(ctx);
    const client = crossSideUtils.get('client');

    const res = await client.post('/dev');
    return {
      res: res.data
    }
  }

  render() {
    return (
      <Layout>
        <p>This is Login Page</p>
        {
          JSON.stringify(this.props.res)
        }
      </Layout>
    )
  }
};

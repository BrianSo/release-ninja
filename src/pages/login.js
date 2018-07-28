import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import { inject } from 'mobx-react';

@inject('client')
export default class extends Component{

  componentDidMount() {
    // console.log(this.props.client);
  }

  render() {
    return (
      <Layout>
        <p>This is Login Page</p>
      </Layout>
    )
  }
};

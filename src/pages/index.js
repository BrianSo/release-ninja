import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import { inject } from 'mobx-react';
import Link from 'next/link'
import CrossSideUtils from "../utils/CrossSideUtils";

@inject('env')
export default class extends Component{

  static async getInitialProps (ctx) {
    let data = [];
    const crossSideUtils = CrossSideUtils.getInstance(ctx);
    const client = crossSideUtils.get('client');

    data = (await client.get('https://api.tvmaze.com/search/shows?q=batman')).data;
    return {
      shows: data
    }
  }

  render() {
    return (
      <Layout>
        <p>Hello Next.js</p>
        {this.props.shows.map(({show}) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
        {
          JSON.stringify(this.props.env)
        }
      </Layout>
    )
  }
};

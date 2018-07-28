import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import { inject } from 'mobx-react';
import Link from 'next/link'

@inject('client')
export default class extends Component{

  static async getInitialProps ({ client, req }) {
    const res = await client.get('https://api.tvmaze.com/search/shows?q=batman');
    return {
      shows: res.data
    }
  }

  state = {
    shows: []
  };

  async componentDidMount() {
    const res = await this.props.client.get('https://api.tvmaze.com/search/shows?q=superman');
    this.setState({
      shows: res.data
    });
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
        {this.state.shows.map(({show}) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </Layout>
    )
  }
};

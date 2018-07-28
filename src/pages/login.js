import React, { Component } from 'react';
import Layout from '../layouts/Layout';
import { inject } from 'mobx-react';
import CrossSideUtils from "../utils/CrossSideUtils";

@inject('client')
export default class extends Component{

  static async getInitialProps (ctx) {
    const crossSideUtils = CrossSideUtils.getInstance(ctx);
    const client = crossSideUtils.get('client');

    const isLoggedIn = ctx.req && !!ctx.req.user;

    // const res = await client.post('/dev');
    return {
      isLoggedIn,
      // res: res.data
    }
  }

  state = {
    isLoggedIn: false,
    email: '',
    password: '',
    user: null,
  };

  componentWillMount() {
    this.state.isLoggedIn = this.props.isLoggedIn;
  }

  async login() {
    const { email, password } = this.state;
    try{
      await this.props.client.post('/login', {
        email,
        password
      });
      this.setState({
        isLoggedIn: true
      });
    } catch (e) {
      console.log('login fail');
      console.error(e);
    }
  }
  async logout() {
    const { email, password } = this.state;
    try{
      await this.props.client.post('/logout');
      this.setState({
        isLoggedIn: false
      });
    } catch (e) {
      console.log('login fail');
      console.error(e);
    }
  }

  async getUserObject() {
    try{
      const user = (await this.props.client.get('/user')).data;
      this.setState({
        user
      });
    } catch (e) {
      console.log('get user fail');
      console.error(e);
    }
  }

  render() {
    const { email, password, user, isLoggedIn } = this.state;

    return (
      <Layout>
        <p>This is Login Page</p>
        <p>
          {
            `You are ${isLoggedIn ? '' : ' not '} logged in`
          }
        </p>
        Email: <input type="text" value={email} onChange={(e) => this.setState({ email: e.target.value })} />
        <br/>
        Password: <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
        <br/>
        <div onClick={() => this.login()} >Login</div>
        <div onClick={() => this.logout()} >Logout</div>
        <div onClick={() => this.getUserObject()} >getUser</div>
        {
          JSON.stringify(user)
        }
      </Layout>
    )
  }
};

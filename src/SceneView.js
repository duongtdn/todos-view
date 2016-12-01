"use strict"

import React , { Component } from 'react'
import { Page, Navigator } from 'react-onsenui'

import routes from './routes'

export default class AppView extends Component {

  constructor(props) {
    super(props);

    this.navigator = null;
    this.route = null;

    this.pushPage = this.pushPage.bind(this);
  }

  componentWillMount () {
    this.navigator = this.props.navigator;
    this.route = this.props.route;
  }

  render() {
    const page = React.cloneElement(this.route.view, {      
      platform : this.props.platform,
      data : this.route.data,
      pushPage : this.pushPage
    });
    return (
      <Page>
        {page}
      </Page>      
    );
  }

  pushPage(name, data) {
    if (routes[name]) {
      routes[name].data = data;
      this.navigator.pushPage(routes[name]);
    }    
  }

}
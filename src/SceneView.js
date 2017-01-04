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
    this.popPage = this.popPage.bind(this);
    this.resetPage = this.resetPage.bind(this);
  }

  componentWillMount () {
    this.navigator = this.props.navigator;
    this.route = this.props.route;
  }

  render() {
    const page = React.cloneElement(this.route.view, {      
      platform : this.props.platform,
      data : this.route.data,
      pushPage : this.pushPage,
      popPage : this.popPage,
      resetPage : this.resetPage
    });
    return (
      <Page>
        {page}
      </Page>      
    );
  }

  pushPage(name, data, options) {
    if (routes[name]) {
      routes[name].data = data;
      this.navigator.pushPage(routes[name], options);
    }    
  }

  popPage() {
    this.navigator.popPage();
  }

  resetPage(name, options = {}) {
    /* quick fix for onsenui resetPage duplicated key */
    if (this.navigator.pages[0].key === 'login') {
      name = 'relogin';
    }
    if (routes[name]) {
      this.navigator.resetPage(routes[name], options);
    }
  }

}
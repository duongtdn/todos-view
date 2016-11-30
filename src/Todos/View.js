"use strict"

import React , { Component } from 'react'
import { Page, Fab } from 'react-onsenui'

import Toolbar from './Toolbar'
import Tabbar from './Tabbar'

export default class extends Component {

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderFixed = this.renderFixed.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} />
    );
  }

  renderFixed() {
    if (this.props.platform === 'android') {
      return (
        <Fab position = 'bottom right'> + </Fab>
      );
    } else {
      return null;
    }  
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar}
            renderFixed = {this.renderFixed}
       >
        <Tabbar platform = {this.props.platform}/>
      </Page>
    );
  }
}
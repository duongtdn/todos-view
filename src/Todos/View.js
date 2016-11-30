"use strict"

import React , { Component } from 'react'
import { Page } from 'react-onsenui'

import Toolbar from './Toolbar'
import Tabbar from './Tabbar'

export default class extends Component {

  renderToolbar() {
    return (
      <Toolbar />
    );
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <Tabbar/>
      </Page>
    );
  }
}
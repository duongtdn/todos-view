"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'
import { Page } from 'react-onsenui'

import Toolbar from './Toolbar'
import TodosView from './TodosView'

export default class AppView extends Component {

  renderToolbar() {
    return (
      <Toolbar />
    );
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <TodosView/>
      </Page>
    );
  }

}
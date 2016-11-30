"use strict"

import React , { Component } from 'react'
import { Page } from 'react-onsenui'

import TodosView from './Todos/View'

export default class AppView extends Component {

  

  render() {
    return (
      <Page >
        <TodosView platform = {this.props.platform} />
      </Page>
    );
  }

}
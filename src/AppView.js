"use strict"

import React , { Component } from 'react'
import { Page } from 'react-onsenui'

import TodosView from './Todos/View'
import TodoEditorView from './TodoEditor/View'

export default class AppView extends Component {

  

  render() {
    return (
      <Page >
        <TodoEditorView platform = {this.props.platform} />
      </Page>
    );
  }

}
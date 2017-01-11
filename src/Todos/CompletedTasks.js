"use strict"

import React , { Component } from 'react'
import { Page, List } from 'react-onsenui'

import CompletedTask from './CompletedTask'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation : ''    
    }; 

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, index) {
    return (
      <CompletedTask 
        data = {row} 
        platform = {this.props.platform} 
        key = {row.id}
        undoComplete = {this.props.undoComplete}
        deleteTodo = {this.props.deleteTodo}
        friends = {this.props.friends}
        auth = {this.props.auth}
      />
    );   
  }

  render() {
    return (
      <Page>
        <List
          dataSource = {this.props.todos}
          renderRow = {this.renderRow}
        />
      </Page>
    );
  }

}
"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input} from 'react-onsenui'


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {data : [
      'Complete Todo App',
      'Study Admob',
      'Find solutions for promoting app across multiple platform'
    ]};
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} >
        <div className = 'left'>
          <Input type = 'checkbox' />
        </div>
        <div className = 'center'>
            {row}
        </div>
        <div className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </div>
      </ListItem>
    );
  }

  render() {
    return (
      <Page>
        <List
          dataSource = {this.state.data}
          renderRow = {this.renderRow}
        />
      </Page>
    );
  }
}

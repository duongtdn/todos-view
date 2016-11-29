"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input} from 'react-onsenui'


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {data : [
      'Complete Todo App',
      'Study Admob',
      'Design using Onsen UI and build with Cordova',
      'Find solutions for promoting app across multiple platform including Android, IOS, Web... or even third party vendors'
    ]};
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} >
        <div className = 'left'>
          <Input type = 'checkbox' />
        </div>
        <div className = 'center'>
          <div className = 'todos-text'>
            {row}
          </div>
          <div className = 'todos-ext'>
            <span> <Icon icon = 'fa-user' /> owner </span>
            <span> <Icon icon = 'md-share' /> 2 </span>
            <span> <Icon icon = 'fa-calendar' /> 30-Nov-2016 </span>
          </div>
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

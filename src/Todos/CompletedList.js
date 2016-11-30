"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [
        {role : 'Collaborator', text : 'Setup npm project', completedAt : '30-Nov'},
        {role : 'Owner', text : 'Init github repo', completedAt : '29-Nov'},        
      ]
    };
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} >
        <div className = 'left'> 
          <Input type = 'checkbox' />
        </div>

        <div className = 'center' onClick = {() => this.toggleInfoMenu(index)}>
          <div className = 'todos-text'>
            {row.text}
          </div>
          <div className = 'todos-ext'>
            completed at {row.completedAt}
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

  toggleInfoMenu() {

  }

}
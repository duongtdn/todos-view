"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row} from 'react-onsenui'


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {data : [
      {role : 'Collaborator', text : 'Complete Todo App', dueDate : '30-Nov'},
      {role : 'Owner', text : 'Study Admob', dueDate : '12-Dec'},
      {role : 'Collaborator', text : 'Design using Onsen UI and build with Cordova', dueDate : ''},
      {role : 'Owner', text : 'Find solutions for promoting app across multiple platform including Android, IOS, Web... or even third party vendors', dueDate : '15-Dec'}
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
            {row.text}
          </div>
          <div className = 'todos-ext'>
            <Row>
              <Col> {row.role} </Col>
              <Col style = {{textAlign : 'right'}}> {row.dueDate} </Col>
            </Row>
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

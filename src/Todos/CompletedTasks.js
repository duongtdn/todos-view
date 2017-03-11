"use strict"

import React , { Component } from 'react'
import { Page, List, ListHeader, Row, Col, Icon } from 'react-onsenui'

import CompletedTask from './CompletedTask'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation : ''    
    }; 

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader  = this.renderHeader.bind(this);
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

  renderHeader() {
    return (
      <ListHeader> 
        <Row>
          <Col> All completed todos </Col>
          {/*<Col style = {{textAlign : 'right', color: 'orange'}}> 
            <Icon icon = 'md-delete'  /> Delete All 
          </Col>*/}
        </Row>
      </ListHeader>
    )
  }

  render() {
    return (
      <Page>
        <List
          dataSource = {this.props.todos}
          renderRow = {this.renderRow}
          renderHeader = {this.renderHeader}
        />
        <div style = {{paddingBottom : '80px'}} />
      </Page>
    );
  }

}
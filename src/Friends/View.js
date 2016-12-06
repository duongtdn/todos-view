"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, BottomToolbar, Row, Col } from 'react-onsenui'

import Toolbar from './Toolbar'

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} modifier = 'nodivider' >
        <label className = 'left'> 
          <Input type = 'checkbox' inputId = {`checkbox-${row.id}`} checked = {false} />
        </label>
        <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
          <Col>
            <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
            <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
          </Col>
        </label>
        <label className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </label>
      </ListItem>
    );
  }

  renderHeader() {
    return (
      <ListHeader> {this.props.category} </ListHeader>
    );
  }

  render() {
    return (
      <List dataSource = {this.props.data} 
            renderRow = {this.renderRow}
            renderHeader = {this.renderHeader}
            modifier = 'noborder'
      />
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data : {
        family : [
          { id : '001', name : 'Eagle D. Stormrider', email : 'eagle@stormgle.com'},
          { id : '002', name : 'Narina D. Iceheart', email : 'narina@stormgle.com'},
        ],
        friends : [
          { id : '004', name : 'Alex Hammer', email : 'alex@vendors.com' },
          { id : '006', name : 'Olandos White', email : 'olandos@vendors.com' },
          { id : '003', name : 'Fred Stonebreak', email : 'fred@vendors.com' },
        ],
        colleagues : [
          { id : '007', name : 'Rolan Skywalker', email : 'rolan@vendors.com' },
          { id : '005', name : 'Emily Star', email : 'emily@vendors.com' },
          { id : '008', name : 'Bob Ginger', email : 'bob@vendors.com' },
        ]
      }
    }

    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} pushPage = {this.props.pushPage} title = 'Collaborators' />
    );
  }

  renderBottomToolbar() {
    return (
      <BottomToolbar>

          <Row style = {{height : '100%'}} >
            <Col verticalAlign = 'center'> 
              <Button modifier = 'quiet' style = {{textAlign: 'center', width: '100%'}}> Cancel </Button> 
            </Col>
            <Col verticalAlign = 'center'> 
              <Button modifier = 'quiet' style = {{textAlign: 'center', width: '100%'}}> Done </Button> 
            </Col>
          </Row>

      </BottomToolbar>
    );       
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar}
            renderBottomToolbar = {this.renderBottomToolbar}
      >
        <FriendsList category = 'Family' data = {this.state.data.family} />
        <FriendsList category = 'Friends' data = {this.state.data.friends} />
        <FriendsList category = 'Colleagues' data = {this.state.data.colleagues} />
      </Page>
    );
  }

}
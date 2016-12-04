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
        <div className = 'left'> 
          <Input type = 'checkbox' checked = {false} />
        </div>
        <div className = 'center'>
          <div className = 'todo-editor-collaborate-name'> {row.name} </div>
          <div className = 'todo-editor-collaborate-relationship'> {row.email} </div>
        </div>
        <div className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </div>
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
          { name : 'Eagle D. Stormrider', email : 'eagle@stormgle.com'},
          { name : 'Narina D. Iceheart', email : 'narina@stormgle.com'},
        ],
        friends : [
          { name : 'Alex Hammer', email : 'alex@vendors.com' },
          { name : 'Olandos White', email : 'olandos@vendors.com' },
          { name : 'Fred Stonebreak', email : 'fred@vendors.com' },
        ],
        colleagues : [
          { name : 'Rolan Skywalker', email : 'rolan@vendors.com' },
          { name : 'Emily Star', email : 'emily@vendors.com' },
          { name : 'Bob Ginger', email : 'bob@vendors.com' },
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

          <Row>
            <Col> 
              <Button modifier = 'quiet' style = {{textAlign: 'center', width: '100%'}}> Cancel </Button> 
            </Col>
            <Col> 
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
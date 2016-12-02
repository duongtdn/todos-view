"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'

class Search extends Component {

  render() {
    return (
      <List >
        <ListItem modifier = 'nodivider' >
          <div className = 'center'>
            <Input type = 'search' placeholder = 'search by email' />
            <div className = 'center'>
              <Button modifier = 'quiet' > or invite join by email </Button>
            </div>
          </div>
        </ListItem>        
      </List>
    );
  }

}

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
        ]
      }
    }

    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} title = 'Collaborators' />
    );
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <Search />
        <FriendsList category = 'Family' data = {this.state.data.family} />
        <FriendsList category = 'Friends' data = {this.state.data.friends} />
      </Page>
    );
  }

}
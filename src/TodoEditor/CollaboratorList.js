"use strict"

import React , { Component } from 'react'
import { List, ListItem, Button, Icon} from 'react-onsenui'

export default class CollaboratorList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, index) {
    const unshareBtn = row.role === 'owner' ? null : this.props.disabled ? null :
          <Button modifier = 'quiet' onClick = {() => this.unshare(row.id)} > 
            <Icon icon = 'md-close' size = {24} style={{color: '#f44336'}}/> 
          </Button>

    return (
      <ListItem key = {index} modifier = 'nodivider' >
        <div className = 'center'>
          <div className = 'todo-editor-collaborate-name'> {row.name} </div>
          <div className = 'todo-editor-collaborate-relationship'> {row.relationship} </div>
        </div>
        <div className = 'right'>
          {unshareBtn}
        </div>
      </ListItem>
    );
  }

  render() {
    return (
      <List dataSource = {this.props.data} 
            renderRow = {this.renderRow}
            modifier = 'noborder'
      />
    );
  }

  unshare(id) {
    this.props.unshare(id);
  }
}

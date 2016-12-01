"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Switch, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'

class CollaboratorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {uid : '001', name : 'Alex Nova', relationship : 'Friend'},
        {uid : '002', name : 'Dylan Riskerman', relationship : 'Friend'},
        {uid : '003', name : 'Olando White', relationship : 'Friend'},
      ]
    };
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} modifier = 'nodivider' >
        <div className = 'center'>
          <div className = 'todo-editor-collaborate-name'> {row.name} </div>
          <div className = 'todo-editor-collaborate-relationship'> {row.relationship} </div>
        </div>
        <div className = 'right'>
          <Icon icon = 'md-close' size = {24} style={{color: 'grey'}}/>
        </div>
      </ListItem>
    );
  }

  render() {
    return (
      <List dataSource = {this.state.data} 
            renderRow = {this.renderRow}
            modifier = 'noborder'
      />
    );
  }
}

class TaskInputs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>

        <ListHeader> Add a new Todo </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div className = 'center'>
            <Input className = 'todo-editor-text-input' type = 'text' placeholder = 'I want to...' float />
          </div>
        </ListItem>

        <ListItem modifier = 'nodivider'>
          <label className = 'center todo-editor-urgent-label' > Urgent? </label>
          <label className = 'right' > <Switch /> </label>
        </ListItem>

        <ListHeader> Collaborate with </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div style = {{width : '100%'}}>
            <Button modifier = 'quiet'> Click to pick one... </Button>
          </div>
          <div style = {{width : '100%'}} >
            <CollaboratorList />
          </div>
        </ListItem>

      </List>
    );
  }
}


export default class extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} />
    );
  }

  render() {
    return (
     <Page renderToolbar = {this.renderToolbar}
            renderFixed = {this.renderFixed}
       >
        <TaskInputs />
        <div style={{padding: '16px'}}>
          <Button  modifier = 'large' > Add new Todo </Button>
        </div>
      </Page>
    );
  }

}
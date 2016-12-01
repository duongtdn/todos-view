"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Switch, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'

class CollaboratorList extends Component {
  constructor(props) {
    super(props);
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
      <List dataSource = {this.props.data} 
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
    const title = this.props.data ? 'Modify your Todo' : 'Add a new Todo';
    const text = this.props.data ? this.props.data.text : null;
    const urgent = this.props.data ? this.props.data.urgent : false;
    const share = this.props.data ? this.props.data.share : [];
    return (
      <List>

        <ListHeader> {title} </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div className = 'center'>
            <Input className = 'todo-editor-text-input' type = 'text' placeholder = 'I want to...' value = {text} float />
          </div>
        </ListItem>

        <ListItem modifier = 'nodivider'>
          <label className = 'center todo-editor-urgent-label' > Urgent? </label>
          <label className = 'right' > <Switch checked = {urgent} /> </label>
        </ListItem>

        <ListHeader> Collaborate with </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div style = {{width : '100%'}}>
            <Button modifier = 'quiet'> Click to pick one... </Button>
          </div>
          <div style = {{width : '100%'}} >
            <CollaboratorList data = {share} />
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
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  render() {
    const btn = this.props.data ? 'Save' : 'Add';
    return (
     <Page renderToolbar = {this.renderToolbar}
       >
        <TaskInputs data = {this.props.data} />
        <div style={{padding: '16px'}}>
          <Button ripple = {true} modifier = 'large' > {btn} </Button>
        </div>
      </Page>
    );
  }

}
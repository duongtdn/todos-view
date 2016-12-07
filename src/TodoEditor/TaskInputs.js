"use strict"

import React , { Component } from 'react'
import { List, ListItem, ListHeader, Input, Switch, Button, Icon} from 'react-onsenui'

import CollaboratorList from './CollaboratorList'


export default class TaskInputs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.data ? 'Modify your Todo' : 'Add a new Todo';
    const text = this.props.data.text;
    const urgent = this.props.data.urgent;
    const share = this.props.data.share;
    return (
      <List>

        <ListHeader> {title} </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div className = 'center'>
            <Input className = 'todo-editor-text-input' type = 'text' 
                   placeholder = 'I want to...' 
                   value = {text}
                   onChange = {e => this.props.getTodoText(e.target.value)} 
                   float />
          </div>
        </ListItem>

        <ListItem modifier = 'nodivider'>
          <label className = 'center todo-editor-urgent-label' > 
            Is it Urgent? 
          </label>
          <label className = 'right' > 
            <Switch checked = {urgent} 
                    onChange = {e => this.props.getTodoUrgent(e.target.checked)} 
            /> 
          </label>
        </ListItem>

        <ListHeader> Collaborate with </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div style = {{width : '100%'}}>
            <Button modifier = 'quiet' 
                    onClick = {() => this.props.pushPage('friends')}
            > 
              Click to pick one... 
            </Button>
          </div>
          <div style = {{width : '100%'}} >
            <CollaboratorList data = {share} />
          </div>
        </ListItem>

      </List>
    );
  }
}
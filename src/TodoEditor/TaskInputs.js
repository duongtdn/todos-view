"use strict"

import React , { Component } from 'react'
import { List, ListItem, ListHeader, Input, Switch, Button, Icon} from 'react-onsenui'

import CollaboratorList from './CollaboratorList'


export default class TaskInputs extends Component {
  constructor(props) {
    super(props);
    this.state = { share : [] };
  }

  componentWillMount() {
    const share = [];
    for (let uid in this.props.data.share) {
      if (uid === this.props.auth.uid) {
        share.push({ 
          name : 'Me', 
          relationship : this.props.data.share[uid]
        });
      } else {
        if (this.props.friends[uid]) {
          share.push({
            name : this.props.friends[uid].name,
            relationship : this.props.friends[uid].relationship
          });
        } else {
          share.push({
            name : 'Unknown',
            relationship : 'not connected'
          });
        }
      }
    }
    this.setState({ share });
  }

  render() {
    const title = this.props.data ? 'Modify your Todo' : 'Add a new Todo';
    const text = this.props.data.text;
    const urgent = this.props.data.urgent;
    const share = this.state.share;
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
              <Icon icon = 'fa-user-plus' /> Invite People 
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
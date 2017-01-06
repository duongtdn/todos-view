"use strict"

import React , { Component } from 'react'
import { List, ListItem, ListHeader, Switch, Button, Icon} from 'react-onsenui'

import { DatePicker } from 'react-onsenui-datepicker'

import AutofocusInput from '../Components/AutofocusInput'

import CollaboratorList from './CollaboratorList'


export default class TaskInputs extends Component {
  constructor(props) {
    super(props);
    this.state = { share : [] };

    this.getShareListFromProps = this.getShareListFromProps.bind(this);
  }

  componentWillMount() {
    this.getShareListFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getShareListFromProps(nextProps);
  }

  getShareListFromProps(props) {
    const share = [];
    for (let uid in props.data.share) {
      if (props.data.share[uid] !== null) {
        if (uid === props.auth.uid) {
          share.push({ 
            id : uid,
            name : 'Me', 
            relationship : props.data.share[uid]
          });
        } else {
          if (props.friends && props.friends[uid]) {
            share.push({
              id : uid,
              name : props.friends[uid].name,
              relationship : props.friends[uid].relationship
            });
          } else {
            share.push({
              id : uid,
              name : 'Unknown',
              relationship : 'not connected'
            });
          }
        }
      }
    }
    this.setState({ share });
  }

  render() {
    const title = this.props.data.text.length > 0 ? 'Modify your Todo' : 'Add a new Todo';
    const text = this.props.data.text;
    const urgent = this.props.data.urgent;
    const share = this.state.share;
    const selectedDate = this.props.data.dueDate || null;
    return (
      <List>

        <ListHeader> {title} </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div className = 'center'>
            <AutofocusInput className = 'todo-editor-text-input' type = 'text' 
                   placeholder = 'I want to...' 
                   value = {text}
                   onChange = {e => this.props.getTodoText(e.target.value)} 
                   float />
          </div>
        </ListItem>

        <ListItem modifier = 'nodivider' >
          <label> Due date </label> 
          <label className = 'right' > 
            <DatePicker preOpenCalendar = {this.props.hideToolbar} 
                        onSelectDate = {this.props.getDueDate} 
                        selectedDate = {selectedDate} /> 
          </label>
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

        <ListHeader> Collaborate </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div style = {{width : '100%'}}>
            <Button modifier = 'quiet' 
                    onClick = {() => this.props.inviteFriends()}
            > 
              <Icon icon = 'fa-user-plus' /> Invite People 
            </Button>
          </div>
          <div style = {{width : '100%'}} >
            <CollaboratorList data = {share} unshare = {this.props.unshare} />
          </div>
        </ListItem>

      </List>
    );
  }

}
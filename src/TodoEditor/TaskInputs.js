"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Switch, Button, Icon} from 'react-onsenui'

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
        const sharedUser = props.data.share[uid];
        if (/recall/i.test(sharedUser.status) || sharedUser.status === 'unshared') {
          continue;
        }
        if (uid === props.auth.uid) {
          share.push({ 
            id : uid,
            name : 'Me', 
            role : sharedUser.role,
            relationship : sharedUser.role === 'owner' ? 'Task owner' : sharedUser.role
          });
        } else {
          const label = (/invited/i).test(sharedUser.status) ? ', Inviting' : '';
          if (props.friends && props.friends[uid]) {
            share.push({
              id : uid,
              name : props.friends[uid].name,
              role : sharedUser.role,
              relationship : `${props.friends[uid].relationship}${label}`
            });
          } else {
            share.push({
              id : uid,
              name : sharedUser.name,
              role : sharedUser.role,
              relationship : `not connected${label}`
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
      <Page>
        <List>

          <ListHeader> {title} </ListHeader>

          <ListItem modifier = 'nodivider'>
            <div className = 'center'>
              <AutofocusInput className = 'todo-editor-text-input' type = 'text' 
                    placeholder = 'I want to...' 
                    value = {text}
                    onChange = {e => this.props.getTodoText(e.target.value)} 
                    onKeyUp = {e => this.handleKeyUp(e.keyCode)}
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

        <div className = 'dummy-btn' >
          <button id = 'dummy' />
        </div>

      </Page>
    );
  }

    handleKeyUp(code) {
    if (code === 13) { // enter key
      // blur from input box by focus to a dummy element
      document.getElementById('dummy').focus();
    }
  }

}
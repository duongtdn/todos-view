"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Switch, Button, Icon} from 'react-onsenui'

import AutofocusInput from '../Components/AutofocusInput'

import CollaboratorList from './CollaboratorList'
import DateBox from '../Components/DateBox'

export default class TaskInputs extends Component {
  constructor(props) {
    super(props);
    this.state = { share : [], selectedDate : null };

    this.getShareListFromProps = this.getShareListFromProps.bind(this);
    this.openTaskGroupList = this.openTaskGroupList.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
    this.getDueDate = this.getDueDate.bind(this);
  }

  componentWillMount() {
    this.getShareListFromProps(this.props);
    if (this.props.data.dueDate) {
      this.setState({ selectedDate : this.props.data.dueDate });
    }
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
          let label = '';
          if (/invited./i.test(sharedUser.status)) {
            label = ', Invited';
          } else if (/invited/i.test(sharedUser.status)) {
            label = ', Inviting'
          }
          if (props.friends && props.friends[uid]) {
            let rel = `${props.friends[uid].relationship}${label}`;
            if (sharedUser.role === 'owner') {
              rel = `Task owner, ${rel}`;
            }
            share.push({
              id : uid,
              name : props.friends[uid].name,
              role : sharedUser.role,
              relationship : rel,
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

    let taskGroup = 'None';
    if (this.props.data.group && this.props.data.group.updated) {
      if (this.props.data.group.updated !== '_0_') {
        taskGroup = this.props.taskGroup[this.props.data.group.updated].name;
      }    
    } else if (this.props.data.group && this.props.data.group.origin) {
      taskGroup = this.props.taskGroup[this.props.data.group.origin].name;
    }

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
                    modifier = 'underbar'
                    float />
            </div>
          </ListItem>

          <ListItem modifier = 'nodivider' >
            <label> Due date </label> 
            <label className = 'right' > 
              <DateBox selectedDate = {this.state.selectedDate}
                       onClick ={this.openDatePicker} />
            </label>
          </ListItem>

          <ListItem modifier = 'nodivider' >
            <label> Task group </label> 
            <label className = 'right' > 
              <label onClick = {this.openTaskGroupList} > 
                {taskGroup} <Icon icon = 'fa-caret-down' />
              </label>
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

  openTaskGroupList() {
    this.props.pushPage('taskGroupList', {
      get: this.props.getTaskGroup,
      selected: this.props.data.group,
    }, {
      animation : 'lift'
    });
  }

  handleKeyUp(code) {
    if (code === 13) { // enter key
      // blur from input box by focus to a dummy element
      document.getElementById('dummy').focus();
    }
  }

  getDueDate(date) {
    this.setState({ selectedDate : date });
    this.props.getDueDate(date);
  }

  openDatePicker() {
    this.props.pushPage('datePicker', {
      get: this.getDueDate,
      selectedDate : this.props.data.dueDate || null
    })
  }

}
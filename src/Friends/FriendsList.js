"use strict"

import React , { Component } from 'react'
import ons from 'onsenui'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, Row, Col, Dialog } from 'react-onsenui'

import AddFriend from './AddFriend.js'


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      dialogShown : false , 
      user : {} 
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.addAndSelectFriend = this.addAndSelectFriend.bind(this);
    this.showAlertDialog = this.showAlertDialog.bind(this);
  }

  renderRow(row) {
    
    const actionBtn = row.connected ? 
      <Button modifier = 'quiet' onClick = {() => this.showAlertDialog(row)} > 
        <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/> 
      </Button> : 
      <Button modifier = 'quiet' onClick = {() => this.showDialog(row)} > 
        <Icon icon = 'md-plus' size = {24} style={{color: 'grey'}}/> 
      </Button>;

    const selectBtn = row.connected ?
      <Input type = 'checkbox' inputId = {`checkbox-${row.id}`} 
                 onChange = {evt => this.selectFriend(row, evt)}
                 checked = {this.isSelected(row.id)} /> :
      null;

    const thirdLbl = row.connected ?
      null :
      <Row className = 'todo-editor-collaborate-relationship'> not connected </Row> ;
    
    return (
      <ListItem key = {row.id} modifier = 'nodivider' >
        <label className = 'left'> 
          {selectBtn}
        </label>
        <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
          <Col>
            <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
            <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
            {thirdLbl}
          </Col>
        </label>
        <label className = 'right'>
          {actionBtn}
        </label>
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
      <Page>
        <List dataSource = {this.props.data} 
              renderRow = {this.renderRow}
              renderHeader = {this.renderHeader}
              modifier = 'noborder'
        />
        <AddFriend show = {this.state.dialogShown}
                   cancel = {this.hideDialog}
                   accept = {this.addAndSelectFriend}
                   name = {this.state.user.name}
                   platform = {this.props.platform}
                   animation = 'none' />
      </Page>
    );
  }

  selectFriend(usr, evt) {
    const checked = evt.target.checked;
    this.props.selectFriend(usr, checked);
  }

  isSelected(id) {
    return (this.props.selectedFriends[id] && this.props.selectedFriends[id] !== null);
  }

  showDialog(user) {
    const dialogShown = true;
    this.setState({ user, dialogShown });
  }

  hideDialog() {
    const dialogShown = false;
    this.setState({ dialogShown });
  }

  addAndSelectFriend(name, rel) {
    const user = {...this.state.user};
    user.name = name;   // security, sanity user input
    user.relationship = rel;

    const dialogShown = false;

    this.setState({ user: user, dialogShown });

    // finally, add this user to friend list and todo share list
    this.props.addAndSelectFriend(user);

  }

  showAlertDialog(user) {
    ons.notification.confirm({
      message: `Do you want to remove ${user.name} from your connected list?`,
      callback : ans => { 
        if (ans === 1) { 
          this.props.unfriend(user.id);
        }
      }
    });
  }

}
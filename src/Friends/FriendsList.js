"use strict"

import React , { Component } from 'react'
import ons from 'onsenui'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, Row, Col, Dialog } from 'react-onsenui'

export default class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      user : {},
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.addAndSelectFriend = this.addAndSelectFriend.bind(this);
    this.showAlertDialog = this.showAlertDialog.bind(this);
    this.openFriendEditor = this.openFriendEditor.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  renderRow(row) {
  
    const actionBtn = row.id === this.props.auth.uid ? null : row.connected ? 
      <Button modifier = 'quiet' onClick = {() => this.showAlertDialog(row)} > 
        <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/> 
      </Button> : 
      <Button modifier = 'quiet' onClick = {() => this.openFriendEditor(row)} > 
        <Icon icon = 'md-plus' size = {24} style={{color: 'grey'}}/> 
      </Button>;

    const selectBtn = row.id === this.props.auth.uid ? null : row.connected ?
      <Input type = 'checkbox' inputId = {`checkbox-${row.id}`} 
                 onChange = {evt => this.selectFriend(row, evt)}
                 checked = {this.isSelected(row.id)} /> :
      null;

    const editBtn = <Button modifier = 'quiet' 
                            style = {{color: '#f44336', paddingLeft: '0'}}
                            onClick = {() => this.openFriendEditor(row)} >
                      Edit
                    </Button>

    const leftBtn = this.props.editable ? editBtn : selectBtn;

    const thirdLbl = row.id === this.props.auth.uid ? 
        <Row className = 'todo-editor-collaborate-relationship'> 
           This is Me 
        </Row>  : 
        row.connected ?
          <Row className = 'todo-editor-collaborate-relationship'> 
            {row.relationship} 
          </Row> 
          :
          <Row className = 'todo-editor-collaborate-relationship'> 
            not connected 
          </Row> ;
    return (
      <ListItem key = {row.id} modifier = 'nodivider' >
        <label className = 'left'> 
          {leftBtn}
        </label>
        <label className = 'center'  >
          <div className = 'todos-text' >
            <Col>
              <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
              <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
              {thirdLbl}
            </Col>
          </div>
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
    const message = this.props.searchingDatabase ?
      <div className = 'search-message'> Searching... </div> :
      this.props.matchedSearch ? null :
      <div className = 'search-message'> No match found </div>
    return (
      <Page>
        <List dataSource = {this.props.data} 
              renderRow = {this.renderRow}
              renderHeader = {this.renderHeader}
              modifier = 'noborder'
        />
        {message}
      </Page>
    );
  }

  selectFriend(usr, evt) {
    const checked = !this.isSelected(usr.id);
    this.props.selectFriend(usr, checked);
  }

  isSelected(id) {    
    return this.props.selectedFriends[id] && 
          this.props.selectedFriends[id] !== null && 
          this.props.selectedFriends[id].status !== 'unshared' &&
          !/recall/i.test(this.props.selectedFriends[id].status);
  }

  addAndSelectFriend(name, rel) {
    const user = {...this.state.user};
    user.name = name;   // security, sanity user input
    user.relationship = rel;

    this.setState({ user });

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

  openFriendEditor(user) {
    this.setState({ user });
    this.props.pushPage('friendEditor', { 
      name : user.name,
      email : user.email,
      rel : user.relationship || null,
      save : this.addAndSelectFriend
    });
  }

}
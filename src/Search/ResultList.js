"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Button, Input, Icon, Row, Col, Dialog } from 'react-onsenui'

class MyDialog extends Component {

  constructor(props) {
    super(props);

    this.name = '';

  }

  componentDidMount() {
    this.name = this.props.value;
  }

  componentWillReceiveProps(nextProps) {
    this.name = nextProps.value;
  }

  render() {
    return (
      <Dialog isOpen = {this.props.dialogShown}
              isCancelable = {true}
              onCancel={this.props.cancel} >
        <div className='alert-dialog-title'> {this.props.title} </div>
        <div className='alert-dialog-content'>
            <Input value ={this.name} onChange = {e => this.getUserInputName(e.target.value)} />
        </div>
        <div className='alert-dialog-footer'>
          <Row>
            <Col>
              <button className='alert-dialog-button' onClick = {this.props.cancel} >
                Cancel
              </button>
            </Col>
            <Col>
              <button className='alert-dialog-button' onClick = {() => this.props.accept(this.name)} >
                Ok
              </button>
            </Col>
          </Row>
        </div>
      </Dialog>
    );
  }

  getUserInputName(name) {
    this.name = name;
  }

}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { dialogShown : false, user : {} };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.rename = this.rename.bind(this);
    this.selectUser = this.selectUser.bind(this);

  }

  renderRow(row) {
    if (row.connected) {
      return (
        <ListItem key = {row.id} modifier = 'nodivider' >
          <label className = 'left'> 
            
          </label>
          <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
            <Col>
              <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
              <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
            </Col>
          </label>
          <label className = 'right'>
            <Button onClick = {() => this.selectUser(row)} > Select </Button>
          </label>
        </ListItem>
      );
    } else {
        return (
        <ListItem key = {row.id} modifier = 'nodivider' >
          <label className = 'left'> 
            
          </label>
          <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
            <Col>
              <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
              <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
              <Row className = 'todo-editor-collaborate-relationship'> not connected </Row>            
            </Col>
          </label>
          <label className = 'right'>
            <Button onClick = {() => this.addFriend(row)} > Add </Button>
          </label>
        </ListItem>
      );
    }
    
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
        <MyDialog dialogShown = {this.state.dialogShown} 
                  cancel = {this.hideDialog} 
                  accept = {this.rename}
                  title = 'Rename as' 
                  value = {this.state.user.name} />
      </Page>
    );
  }

  selectUser(user) {
    console.log(user);
  }

  addFriend(user) {
    this.setState({ user: user, dialogShown : true });
  }

  rename(name) {
    // get user and rename
    const user = {...this.state.user};
    user.name = name;
    this.setState({ user: user, dialogShown : false });
    // add to friend List
    this.props.addFriend(user);
    // then select this user
    this.selectUser(user);
    // return previous page with selected user
    this.props.popPage();
  }

  hideDialog() {
    this.setState({ dialogShown : false });
  }

}
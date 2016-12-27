"use strict"

import React , { Component } from 'react'
import ons from 'onsenui'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, Row, Col, Dialog } from 'react-onsenui'

class MyDialog extends Component {

  constructor(props) {
    super(props);

    this.value = '';

  }

  componentDidMount() {
    this.value = this.props.value;
  }

  componentWillReceiveProps(nextProps) {
    this.value = nextProps.value;
  }

  render() {
    return (
      <Dialog isOpen = {this.props.dialogShown}
              isCancelable = {true}
              onCancel={this.props.cancel} >
        <div className='alert-dialog-title'> {this.props.title} </div>
        <div className='alert-dialog-content'>
            <Input value ={this.value} onChange = {e => this.getUserInputValue(e.target.value)} />
        </div>
        <div className='alert-dialog-footer'>
          <Row>
            <Col>
              <button className='alert-dialog-button' onClick = {this.props.cancel} >
                Cancel
              </button>
            </Col>
            <Col>
              <button className='alert-dialog-button' onClick = {() => this.props.accept(this.value)} >
                Ok
              </button>
            </Col>
          </Row>
        </div>
      </Dialog>
    );
  }

  getUserInputValue(value) {
    this.value = value;
  }

}


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      dialogShown : { rename : false, relationship : false} , 
      user : {} 
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.rename = this.rename.bind(this);
    this.setRelationship = this.setRelationship.bind(this);
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
                 onChange = {evt => this.selectFriend(row.id, evt)}
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
        <MyDialog dialogShown = {this.state.dialogShown.rename} 
                  cancel = {this.hideDialog} 
                  accept = {this.rename}
                  title = 'Rename as' 
                  value = {this.state.user.name} 
                  animation = 'none' />
        <MyDialog dialogShown = {this.state.dialogShown.relationship} 
                  cancel = {this.hideDialog} 
                  accept = {this.setRelationship}
                  title = 'Set relationship as' 
                  value = {'Friend'} 
                  animation = 'none' />
      </Page>
    );
  }

  selectFriend(id, evt) {
    const checked = evt.target.checked;
    this.props.selectFriend(id, checked);
  }

  isSelected(id) {
    return (this.props.selectedFriends[id] && this.props.selectedFriends[id] !== null);
  }

  showDialog(user) {
    const dialogShown = {
      rename : true,
      relationship : false
    };
    this.setState({ user: user, dialogShown });
  }

  hideDialog() {
    const dialogShown = {
      rename : false,
      relationship : false
    };
    this.setState({ dialogShown });
  }

  rename(name) {
    // get user and rename
    const user = {...this.state.user};
    user.name = name;   // security, sanity user input

    const dialogShown = {
      rename : false,
      relationship : true
    };

    this.setState({ user: user, dialogShown });
  }

  setRelationship(value) {
    const user = {...this.state.user};
    user.relationship = value;    // security, sanity use input

    const dialogShown = {
      rename : false,
      relationship : false
    };

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
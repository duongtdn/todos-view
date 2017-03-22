"use strict"

import React , { Component } from 'react'
import { Page, List, ListHeader, ListItem, Icon, Input, BottomToolbar,
         Col, Row, Button } from 'react-onsenui'

import { connect } from 'react-redux'
import { user, filter } from 'todos-data'

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDisplayName : '',
      showNameInput : false,
    }

    this.openFriendsList = this.openFriendsList.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.showNameEditor = this.showNameEditor.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.close = this.close.bind(this);
    this.openChangePSW = this.openChangePSW.bind(this);
    this.openMessagesPage = this.openMessagesPage.bind(this);
    this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
    this.createNewTaskGroup = this.createNewTaskGroup.bind(this);
    this.selectTaskGroup = this.selectTaskGroup.bind(this);
  }

  componentWillMount() {
    this.setState({ userDisplayName : this.props.user.displayName});
  }

  renderBottomToolbar() {
    return (
      <BottomToolbar>
        <List>
          <ListItem modifier = 'nodivider' >
            <div className = 'left'  >
              <Icon icon = 'fa-sign-out' />
            </div> 
            <div className = 'center' >
              <label className = 'sidemenu-btn' onClick = {this.props.signOut} > Logout </label>
            </div>
          </ListItem>
        </List>
      </BottomToolbar>
    );       
  }

  render() {
    const taskGroups = this.props.taskGroups;
    const badge = this.props.msgCount > 0 ? 
                    this.props.msgCount < 10 ?  
                      <label className = 'badge'> {this.props.msgCount} </label>:
                      <label className = 'badge'> 9+ </label>
                    :
                    null;
    return (
      <Page renderBottomToolbar = {this.renderBottomToolbar} >
        <List>

          <ListHeader>
            <Row>
              <Col className = 'center'> Profile </Col>
            </Row>
          </ListHeader>

          <ListItem modifier = 'nodivider' >
            <div className = 'center sidemenu-username' > 
              <label className = {this.state.showNameInput ? 'hide' : ''}> {this.state.userDisplayName} </label> 
              <Input modifier = 'underbar'
                     className = {this.state.showNameInput ? '' : 'hide'} 
                     value = {this.props.user.displayName}
                     onChange = {e => this.handleNameInput(e.target.value)}
                     onKeyUp = {e => this.handleKeyUp(e.keyCode, e.target.value)} />
            </div>
            <div className = 'right' style = {{textAlign : 'right', color : 'rgba(38, 100, 171, 0.811765)'}}>
              <label onClick = {this.showNameEditor} > 
                <Icon size = {18} icon = {this.state.showNameInput ? null : 'md-edit'} />
              </label>
            </div>
          </ListItem>

          <ListItem modifier = 'nodivider'>
            <div className = 'sidemenu-email' style = {{width : '100%'}} > {this.props.user.email} </div>
            <div>
              <a className = 'sidemenu-link' href='#' onClick = {this.openChangePSW} > Change Password </a>
            </div>
          </ListItem>

        </List>



        <ListHeader modifier = 'nodivider'>
          Links
        </ListHeader>

        <a href = '#' style = {{textDecoration : 'none'}} onClick = {this.openFriendsList} >
          <ListItem modifier = 'longdivider chevron' >
            <div className = 'left' style = {{color : 'grey', minWidth: '30px'}} >
              <Icon icon = 'fa-external-link' />
            </div> 
            <div className = 'center' >
              Contact Book
            </div>
          </ListItem>
        </a>

         <a href = '#' style = {{textDecoration : 'none'}} onClick = {this.openMessagesPage} >
          <ListItem modifier = 'longdivider chevron' >
            <div className = 'left' style = {{color : 'grey', minWidth: '30px'}} >
              <Icon icon = 'fa-external-link' />
            </div> 
            <div className = 'center' >
              Notification {badge}
            </div>
          </ListItem>
        </a>

        <ListHeader modifier = 'nodivider'>
          Task group
        </ListHeader>

        <ListItem modifier = 'nodivider' onClick = {this.createNewTaskGroup}>
          <div className = 'left' style = {{color : 'grey', minWidth: '30px'}} > <Icon icon = 'md-plus' /> </div>
          <div className = 'center' style = {{fontStyle : 'italic'}}> New Task group </div>
        </ListItem>

        {taskGroups.map(task => {
          return (
            <ListItem modifier = 'nodivider' key = {task.id} onClick = {() => this.selectTaskGroup(task)} >
              <div className = 'left' style = {{color : 'grey', minWidth: '30px'}} > <Icon icon = 'md-label' /> </div>
              <div className = 'center'> {task.name} </div>
            </ListItem>
          );
        })}

        <div style = {{paddingBottom : '80px'}} />

      </Page>
    );
  }

  openFriendsList() {
    this.close();
    this.props.pushPage('friends');
  }

  openMessagesPage() {
    this.close();
    this.props.pushPage('messages');
  }

  showNameEditor() {
    this.setState({ 
      showNameInput : true
    });
  }

  handleKeyUp(code, text) {
    if (code === 13) {  // enter
      this.changeName();
    }
  }

  changeName() {
    if (this.state.showNameInput) {
      this.props.changeName(this.userInputName).then(() => {
        // actual update user display name in UI after server response
        this.setState({userDisplayName : this.props.user.displayName });
      });
      this.setState({ 
        userDisplayName : this.userInputName, // optimistic update new user name
        showNameInput : false
      });
    }
  }

  handleNameInput(name) {
    if (name.length > 0) {
      this.userInputName = name;
    }   
  }

  close() {
    this.userInputName = this.props.user.displayName;
    this.setState({ showNameInput : false});
    this.props.hide();
  }

  openChangePSW() {
    this.props.pushPage('login', {nextRoute : 'changePSW'});
  }

  createNewTaskGroup() {
    this.props.pushPage('taskGroupEditor')
  }

  selectTaskGroup(group) {
    this.props.selectTaskGroup(group);
    this.close();
  }

}

/* Container */

const mapStateToProps = state => {  
  const groups = [];
  groups.push({
    id : '_0_',
    name : 'All Todos',
    role : 'owner'
  });
  for (let key in state.user.groups) {
    groups.push({id : key, ...state.user.groups[key]});
  }
  return { 
    user : state.user.auth,
    taskGroups : groups,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    changeName(name) {
      return dispatch(user.changeName(name));
    },
    selectTaskGroup(group) {
      return dispatch(filter.apply(group))
    },
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SideMenu)
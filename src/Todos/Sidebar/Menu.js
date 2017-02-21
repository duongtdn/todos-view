"use strict"

import React , { Component } from 'react'
import { Page, Toolbar, ToolbarButton, Icon, Input,
         Col, Row, Button } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Messages from './Messages'

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDisplayName : '',
      showNameInput : false
    }

    this.renderToolbar = this.renderToolbar.bind(this);
    this.openFriendsList = this.openFriendsList.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.showNameEditor = this.showNameEditor.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    this.setState({ userDisplayName : this.props.user.displayName});
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'right'>
          <ToolbarButton onClick = {this.close} > <Icon icon = 'md-close' /> </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <div className = 'sidemenu-user' >
            <div className = 'sidemenu-username' > 
              <Row>
                <Col> 
                  <label className = {this.state.showNameInput ? 'hide' : ''}> {this.state.userDisplayName} </label> 
                  <Input modifier = 'underbar'
                         className = {this.state.showNameInput ? '' : 'hide'} 
                         value = {this.props.user.displayName}
                         onChange = {e => this.handleNameInput(e.target.value)}
                         onKeyUp = {e => this.handleKeyUp(e.keyCode, e.target.value)} />
                </Col>              
                <Col width = {30} style = {{textAlign : 'right', color : 'rgba(38, 100, 171, 0.811765)'}} >
                  <label onClick = {this.showNameEditor} > 
                    <Icon size = {18} icon = {this.state.showNameInput ? null : 'md-edit'} />
                  </label>
                </Col>
              </Row>
            </div>
            <div className = 'sidemenu-email' > {this.props.user.email} </div>
            <div>
              <a className = 'sidemenu-link' href='#'> Change Password </a>
            </div>
            <Row className = 'sidemenu-bottom-bar'>
              <Col style ={{textAlign : 'left'}}> 
                <div>
                  <div className = 'sidemenu-btn' onClick = {this.openFriendsList}> Connection </div>
                </div>
              </Col>
              <Col style ={{textAlign : 'right'}} > 
                <div className = 'sidemenu-btn' onClick = {this.props.signOut} > Logout </div> 
              </Col>
            </Row>
        </div>
        <div className = 'sidemenu-msg' >
          <Messages />
        </div>
      </Page>
    );
  }

  openFriendsList() {
    this.props.pushPage('friends');
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

}

/* Container */

const mapStateToProps = state => {  
  return { 
    user : state.user.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeName(name) {
      return dispatch(user.changeName(name));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SideMenu)
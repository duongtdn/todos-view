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
      showNameInput : false
    }

    this.renderToolbar = this.renderToolbar.bind(this);
    this.openFriendsList = this.openFriendsList.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'right'>
          <ToolbarButton onClick = {this.props.hide} > <Icon icon = 'md-close' /> </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render() {
    console.log(this.props.user)
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <div className = 'sidemenu-user' >
            <div className = 'sidemenu-username' > 
              <Row>
                <Col> 
                  <label className = {this.state.showNameInput ? 'hide' : ''}> {this.props.user.displayName} </label> 
                  <Input className = {this.state.showNameInput ? '' : 'hide'} value = {this.props.user.displayName} />
                </Col>              
                <Col width = {30} style = {{textAlign : 'right', color : 'rgba(38, 100, 171, 0.811765)'}} >
                  <label onClick = {this.changeName} > 
                    <Icon size = {18} icon = {this.state.showNameInput ? 'md-save' : 'md-edit'} />
                  </label>
                </Col>
              </Row>
            </div>
            <div className = 'sidemenu-email' > {this.props.user.email} </div>
            <div>
              <Button onClick = {this.openFriendsList}> <Icon icon = 'md-share' /> Connection </Button>
            </div>
            <Row>
              <Col style ={{textAlign : 'left'}}> 
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

  changeName() {
    this.setState({ showNameInput : !this.state.showNameInput });
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
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SideMenu)
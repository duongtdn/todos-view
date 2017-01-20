"use strict"

import React , { Component } from 'react'
import { Page, Toolbar, ToolbarButton, 
         Col, Row, Button } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Messages from './Messages'

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.renderToolbar = this.renderToolbar.bind(this);
    this.openProfilePage = this.openProfilePage.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'right'>
          <ToolbarButton onClick = {this.props.hide} > X </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <div className = 'sidemenu-user' >
            <div className = 'sidemenu-username' > {this.props.user.displayName} </div>
            <div className = 'sidemenu-email' > {this.props.user.email} </div>
            <Row>
              <Col style ={{textAlign : 'left'}}> 
                <div className = 'sidemenu-btn' onClick = {this.props.signOut} > Logout </div> 
              </Col>
              <Col style ={{textAlign : 'right'}} > 
                <div className = 'sidemenu-btn' onClick = {this.openProfilePage} > Edit </div> 
              </Col>
            </Row>
        </div>
        <div className = 'sidemenu-msg' >
          <Messages />
        </div>
      </Page>
    );
  }

  openProfilePage() {
    this.props.pushPage('profile');
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
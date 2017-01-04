"use strict"

import React , { Component } from 'react'
import { Page, Toolbar, ToolbarButton, Col, Row, Button, List, ListItem } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'


class Message extends Component {

  render() {
    return (
      <ListItem >

      </ListItem>
    );
  }

}

class Messages extends Component {



}

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.renderToolbar = this.renderToolbar.bind(this);

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
            <div className = 'sidemenu-username' > Duong Nguyen </div>
            <div className = 'sidemenu-email' > {this.props.user.email} </div>
            <Row>
              <Col style ={{textAlign : 'left'}}> 
                <div className = 'sidemenu-btn' onClick = {this.props.signOut} > Logout </div> 
              </Col>
              <Col style ={{textAlign : 'right'}} > 
                <div className = 'sidemenu-btn'> Edit </div> 
              </Col>
            </Row>
        </div>
      </Page>
    );
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
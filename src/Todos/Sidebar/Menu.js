"use strict"

import React , { Component } from 'react'
import { Page, Col, Row, Button } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

class SideMenu extends Component {

  render() {
    return (
      <Page>
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
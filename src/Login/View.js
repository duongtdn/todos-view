"use strict"

import React , { Component } from 'react'

import { Page, Input, Button, Icon } from 'react-onsenui'

import { connect } from 'react-redux'

import Login from './login'

class LoginView extends Component {

  render() {
    return (
      <Page>
        <Login />
      </Page>
    );
  }
}

/* Container */

const mapStateToProps = state => {  
  return { 
    auth : state.user.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LoginView)
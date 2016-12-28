"use strict"

import React , { Component } from 'react'

import { Page, Input, Button, Icon } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Login from './login'

class LoginView extends Component {

  render() {
    return (
      <Page>
        <Login login = {this.props.login} />
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
    login({ email, password }) {
      dispatch(user.signIn(email, password));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LoginView)
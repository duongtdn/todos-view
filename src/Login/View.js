"use strict"

import React , { Component } from 'react'

import { Page, Input, Button, Icon } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Login from './login'

class LoginView extends Component {

  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
  }

  render() {
    return (
      <Page>
        <Login login = {this.props.login} success = {this.success} />
      </Page>
    );
  }

  success() {
    this.props.pushPage('sync');
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
      return dispatch(user.signIn(email, password));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LoginView)
"use strict"

import React , { Component } from 'react'

import { Page } from 'react-onsenui'

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
        <Login login = {this.props.login} 
               signup = {() => this.props.pushPage('signup', null, { animation : 'lift' })} 
               success = {this.success} />
      </Page>
    );
  }

  success(uid) {
    this.props.pushPage('sync', uid);
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 

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
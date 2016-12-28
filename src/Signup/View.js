"use strict"

import React , { Component } from 'react'

import { Page } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Signup from './signup'

class LoginView extends Component {

  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
  }

  render() {
    return (
      <Page>
        <Signup signup = {this.props.signup} success = {this.success} />
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
    signup({email = null, password = null, name = null}) {
      return dispatch(user.signUp({email , password , name }));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(LoginView)
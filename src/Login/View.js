"use strict"

import React , { Component } from 'react'

import { Page, Toolbar, BackButton } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Login from './login'

class LoginView extends Component {

  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    if (this.props.data && this.props.data.nextRoute) {
      return (
        <Toolbar>
          <div className = 'left'>
            <BackButton> 
              Back
            </BackButton  >
          </div>
        </Toolbar>
      );
    } else {
      return null;
    }
    
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <Login login = {this.props.login} 
               signup = {() => this.props.pushPage('signup', null, { animation : 'lift' })} 
               success = {this.success} />
      </Page>
    );
  }

  success(uid) {
    if (this.props.data && this.props.data.nextRoute) {
      this.props.pushPage(this.props.data.nextRoute, uid);
    } else {
      this.props.pushPage('sync', uid);
    }
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
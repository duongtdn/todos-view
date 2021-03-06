"use strict"

import React , { Component } from 'react'

import { Page, List, ListItem, Input, Button, Icon } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      email : '', 
      password : '',
      isSigningIn : false,
      status : '',
      message : ''
    };

    this.login = this.login.bind(this);
    this.openResetPasswordPage = this.openResetPasswordPage.bind(this);

  }

  render() {
    const spining = this.state.isSigningIn ? 
      <Icon icon = 'md-spinner' spin /> :
      null;
    return (
      <Page >
        <div className = 'login-page' > 

          <div className = 'login-header' >
            <div>
              <h3 className = 'center' > LOGIN </h3>
            </div>
            <div>
              {spining}
              <label className = {this.state.success ? 'login-success' : 'login-error'} > 
                {this.state.message} 
              </label>
            </div>
          </div>

          <div className = 'login-form' >
            <List modifier = 'noborder' >

              <ListItem modifier = 'noborder' >
                <Input type = 'email' placeholder = 'Enter your email'
                       onChange = {e => this.getUserEmail(e.target.value)}
                       onKeyUp = {e => this.handleKeyUp(e.keyCode)} />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Password'
                       onChange = {e => this.getUserPassword(e.target.value)}
                       onKeyUp = {e => this.handleKeyUp(e.keyCode)} />
                <div className = 'forgot-pwd' > <a href = '#' onClick = {this.openResetPasswordPage} >Forgot your password </a> </div>
              </ListItem>

            </List>
          </div>

          <div className = 'login-action' >
            <Button modifier = 'large' onClick = {this.login} disabled = {this.state.isSigningIn} > Login </Button>
          </div>

          <div className = 'login-break' >
          </div>

          <div className = 'login-action' >
            <Button modifier = 'quiet large' onClick = {this.props.signup} > New user ? Sign up here </Button>
          </div>

          <div className = 'dummy-btn' >
            <button id = 'dummy' />
          </div>

        </div>
      </Page>
    );
  }

  getUserEmail(email) {
    // need to validate email 
    this.setState ({ email });
  }

  getUserPassword(password) {
    this.setState({ password });
  }

  login() {
    const credential = {
      email : this.state.email.trim(),
      password : this.state.password.trim()
    };
    this.setState({ 
          message : '', 
          isSigningIn : true, 
          success : false 
        });
    // need to validate email before login
    this.props.login(credential)
      .then( usr => {
        // login success
        this.setState({ 
          message : 'login success', 
          isSigningIn : false, 
          success : true 
        });
        // blur from input box by focus to a dummy element
        document.getElementById('dummy').focus();
        /* move to sync page */
        this.props.success(usr.uid);
      })
      .catch( err => {
        /* display login message */
        const isSigningIn = false;
        const success = false;
        let message = '';
        if (err.code === 'auth/invalid-email') {
          message = 'Invalid email';
        } else if (err.code === 'auth/network-request-failed') {
          message = 'Cannot connect to server';
        } else {
          message = 'Wrong email or password';
        }
        this.setState({ message, isSigningIn, success });
      });
  }

  handleKeyUp(code) {
    if (code === 13) { // enter key
      this.login()
    }
  }

  openResetPasswordPage() {
    this.props.openResetPasswordPage()
  }

}
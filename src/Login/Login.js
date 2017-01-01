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
                <Input type = 'text' placeholder = 'Enter your email'
                       onChange = {e => this.getUserEmail(e.target.value)} />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Password'
                       onChange = {e => this.getUserPassword(e.target.value)}
                       onKeyUp = {e => this.handleKeyUp(e.keyCode)} />
              </ListItem>

            </List>
          </div>

          <div className = 'login-action' >
            <Button modifier = 'large' onClick = {this.login} > Login </Button>
          </div>

          <div className = 'login-break' >
            <hr />
          </div>

          <div className = 'login-action' >
            <Button modifier = 'quiet large' onClick = {this.props.signup} > New user ? Sign up here </Button>
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
      email : this.state.email,
      password : this.state.password
    };
    this.setState({ 
          message : '', 
          isSigningIn : true, 
          success : false 
        });
    // need to validate email before login
    this.props.login(credential)
      .then( usr => {
        this.setState({ 
          message : 'login success', 
          isSigningIn : false, 
          success : true 
        });
        /* login success, move to sync page */
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

}
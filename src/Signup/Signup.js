"use strict"

import React , { Component } from 'react'

import { Page, List, ListItem, Input, Button, Icon } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      email : '', 
      password : '',
      repeatPassword : '',
      name : '',
      isSigningUp : false,
      status : '',
      message : ''
    };

    this.signup = this.signup.bind(this);

  }

  render() {
    const spining = this.state.isSigningUp ? 
      <Icon icon = 'md-spinner' spin /> :
      null;
    return (
      <Page >
        <div className = 'login-page' > 

          <div className = 'login-header' >
            <div>
              <h3 className = 'center' > SIGN UP </h3>
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

              <ListItem modifier = 'noborder' >
                <Input type = 'text' placeholder = 'Enter your display name'
                       onChange = {e => this.getUserName(e.target.value)} />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Enter your password'
                       onChange = {e => this.getUserPassword(e.target.value)} />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Repeat your password'
                       onChange = {e => this.getUserRepeatPassword(e.target.value)} />
              </ListItem>

            </List>
          </div>

          <div className = 'login-action' >
            <Button modifier = 'large' onClick = {this.signup} disabled = {this.state.isSigningUp} > Signup </Button>
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

  getUserRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword });
  }

  getUserName(name) {
    this.setState({ name });
  }

  signup() {
    /* validate password */
    if (this.state.password.length === 0) {
      this.setState({
        isSigningUp : false,
        success : false,
        message : 'Missing Password'
      });
      return;
    }

    if (this.state.password !== this.state.repeatPassword) {
      this.setState({
        isSigningUp : false,
        success : false,
        message : 'Password mismatch'
      });
      return;
    }

    const credential = {
      email : this.state.email,
      password : this.state.password,
      name : this.state.name
    };
    this.setState({ 
          message : '', 
          isSigningUp : true, 
          success : false 
        });
    // need to validate email before login
    this.props.signup(credential)
      .then( usr => {
        this.setState({ 
          message : 'signup success', 
          isSigningUp : false, 
          success : true 
        });
        /* login success, move to sync page */
        this.props.success(usr.uid);
      })
      .catch( err => {
        /* display login message */
        const isSigningUp = false;
        const success = false;
        const message = err.message;
        this.setState({ message, isSigningUp, success });
      });
  }

}
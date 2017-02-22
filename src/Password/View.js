"use strict"

import React , { Component } from 'react'

import { Page, List, ListItem, Input, Button, Icon, Toolbar, BackButton } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

class ChangePSW extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
      newPassword: '',
      retypePassword: '',
      message: ''
    };

    this.getNewPassword = this.getNewPassword.bind(this);
    this.getRetypePassword = this.getRetypePassword.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.changePassword = this.changePassword.bind(this);

  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
      </Toolbar>
    );
  }

  render() {
    const spining = this.state.isSigningIn ? 
      <Icon icon = 'md-spinner' spin /> :
      null;
    return (
      <Page renderToolbar = {this.renderToolbar} >

        <div className = 'login-page' > 

          <div className = 'login-header' >
            <div>
              <h3 className = 'center' > CHANGE PASSWORD </h3>
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
                <Input type = 'password' placeholder = 'Enter your new password'
                       onChange = {e => this.getNewPassword(e.target.value)} />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Re-type your new password'
                       onChange = {e => this.getRetypePassword(e.target.value)}
                       onKeyUp = {e => this.handleKeyUp(e.keyCode)} />
              </ListItem>

            </List>
          </div>

          <div className = 'login-action' >
            <Button modifier = 'large' onClick = {this.changePassword} disabled = {this.state.isBusy} > Change Password </Button>
          </div>

        </div>

      </Page>
    );
  }

  getNewPassword(text) {
    this.setState({ newPassword: text, message: '' });
  }

  getRetypePassword(text) {
    this.setState({ retypePassword: text, message: '' });
  }

  handleKeyUp(code) {
    if (code === 13) { //enter keyCode
      this.changePassword();
    }
  }

  changePassword() {
    if (this.state.newPassword.length === 0) {
      this.setState({success: false, message: 'Empty Password Field'});
      return;
    }
    if (this.state.newPassword !== this.state.retypePassword) {
      this.setState({success: false, message: 'Password mismatch'});
    } else {
      this.setState({success: true, isBusy: true, message: ''});
      this.props.changePassword(this.state.newPassword).then(() => {
        this.setState({ isBusy: false, message: 'Change Password Success' });
        this.props.resetPage('sync');
      })
      .catch(err => {
        console.log(err)
        switch (err.code) {
          case 'auth/requires-recent-login' :
            this.setState({success: false, isBusy: false, message: 'Please Log in again before retrying this request'});
            break;
          
          default :
            this.setState({success: false, isBusy: false, message: 'Change Password Failed'});
        }
      });
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
    changePassword(newPassword) {
      return dispatch(user.changePassword(newPassword));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ChangePSW)
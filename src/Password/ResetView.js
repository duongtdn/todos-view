"use strict"

import React , { Component } from 'react'

import { Page, List, ListItem, Input, Button, Icon, Toolbar, BackButton } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
      email: '',
      message: ''
    };

    this.getEmail = this.getEmail.bind(this);
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
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
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <div className = 'login-page' > 

          <div className = 'login-header' >
            <div>
              <h3 className = 'center' > RESET PASSWORD</h3>
            </div>
            <div>
              <label className = {this.state.success ? 'login-success' : 'login-error'} > 
                {this.state.message} 
              </label>
            </div>
          </div>

          <div className = 'login-form' >
            <List modifier = 'noborder' >

              <ListItem modifier = 'noborder' >
                <Input type = 'email' placeholder = 'Enter your email' style ={{width : '100%'}}
                       onChange = {e => this.getEmail(e.target.value)} />
              </ListItem>

            </List>
          </div>

          <div className = 'login-action' >
            <Button modifier = 'large' onClick = {this.sendPasswordResetEmail} disabled = {this.state.isBusy} > Send Email</Button>
          </div>

        </div>
      </Page>
    );
  }

  getEmail(text) {
    this.setState({ email : text, message: '' });
  }

  sendPasswordResetEmail() {
    this.setState({isBusy : true});
    this.props.sendPasswordResetEmail(this.state.email)
        .then(() => this.setState({success : true, message : 'Email Sent', isBusy : false }))
        .catch(err =>  {this.setState({success : false, message : 'Invalid Email or Email does not exist', isBusy : false}); console.log(err) });
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
    },
    sendPasswordResetEmail(email) {
      return dispatch(user.sendPasswordResetEmail(email));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ResetPassword)
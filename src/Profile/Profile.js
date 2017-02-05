"use strict"

import React , { Component } from 'react'

import { Page, Input, Button, Icon, Toolbar, BackButton, ToolbarButton } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);


  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  }

  updateStateFromProps(props) {

    const username = {
      lock : true,
      value : props.user.displayName
    }

    const email = {
      lock : true,
      value : props.user.email
    }

    this.setState({ username, email });

    this.openFriendsList = this.openFriendsList.bind(this);

  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton>
        </div>
        <div className = 'center'>  
          <label> Profile </label> 
        </div>
        <div className = 'right'>  
          <ToolbarButton> <Icon icon = 'md-people' /> </ToolbarButton> 
        </div>
      </Toolbar>
    );
  }

  render() {

    return (
      <Page renderToolbar = {this.renderToolbar} >

        <div className = 'profile-info'>
          <div className = 'display-name'>
            <label> {this.state.username.value} </label>
            <Button modifier = 'quiet' > 
              <Icon icon = 'md-edit' />
            </Button>
          </div>
          <div className = 'email'>
            <label> {this.state.email.value} </label>
            <Button modifier = 'quiet' > 
              <Icon icon = 'md-edit' />
            </Button>
          </div>
        </div>

        <div className = 'profile-connection' >
          <Button modifier = 'quiet' 
                    onClick = {() => this.openFriendsList()}
            > 
              <Icon icon = 'fa-arrow-right' /> Friends List 
            </Button>
        </div>

      </Page>
    );
  }

  openFriendsList() {
    this.props.pushPage('friends');
  }

}
"use strict"

import React , { Component } from 'react'

import { Page, List, ListItem, Input, Button, Icon } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page >
        <div className = 'login-page' > 
          <div className = 'login-header' >
            <h3 className = 'center' > login </h3>
          </div>
          <div className = 'login-form' >
            <List modifier = 'noborder' >

              <ListItem modifier = 'noborder' >
                <Input type = 'text' placeholder = 'Enter your email' />
              </ListItem>

              <ListItem modifier = 'noborder'>
                <Input type = 'password' placeholder = 'Password' />
              </ListItem>

            </List>
          </div>
          <div className = 'login-action' >
            <Button modifier = 'large' > Login </Button>
          </div>
        </div>
      </Page>
    );
  }

}
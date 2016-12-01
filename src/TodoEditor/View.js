"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Switch, Button } from 'react-onsenui'

import Toolbar from './Toolbar'

class TaskInputs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>

        <ListHeader> Add a new Todo </ListHeader>

        <ListItem modifier = 'nodivider'>
          <div className = 'center'>
            <Input type = 'text' placeholder = 'I want to...' float />
          </div>
        </ListItem>

      </List>
    );
  }
}

class TaskOptions extends Component {
  render() {
    return (
      <List>

        <ListHeader> Options </ListHeader>

        <ListItem modifier = 'nodivider'>

          <label className = 'center' > Urgent? </label>
        
          <label className = 'right' > <Switch /> </label>
        
        </ListItem>

      </List>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} />
    );
  }

  render() {
    return (
     <Page renderToolbar = {this.renderToolbar}
            renderFixed = {this.renderFixed}
       >
        <TaskInputs />
        <TaskOptions />
      </Page>
    );
  }

}
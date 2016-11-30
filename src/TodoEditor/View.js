"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader } from 'react-onsenui'

import Toolbar from './Toolbar'

class TaskInputs extends Component {
  render() {
    
  }
}

class TaskOptions extends Component {

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
        <h3> Todo Editor Page </h3>
      </Page>
    );
  }

}
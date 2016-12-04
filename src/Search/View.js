"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'

class Search extends Component {

  render() {
    return (
      <List >
        <ListHeader> Search for a user by email </ListHeader>
        <ListItem modifier = 'nodivider'>
          <Icon icon = 'fa-search' style = {{color : 'grey', marginRight : '6px'}} /> 
          <Input type = 'search' placeholder = 'search by email' /> 
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
      <Toolbar platform = {this.props.platform} title = 'Search' />
    );
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <Search />
      </Page>
    );
  }

}
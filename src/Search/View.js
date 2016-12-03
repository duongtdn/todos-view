"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'

class Search extends Component {

  render() {
    return (
      <List >
        <ListItem modifier = 'nodivider' >
          <div className = 'center'>
            <Input type = 'search' placeholder = 'search by email' />
            <div className = 'center'>
              <Button modifier = 'quiet' > or invite join by email </Button>
            </div>
          </div>
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
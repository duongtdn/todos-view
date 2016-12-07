"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon} from 'react-onsenui'

import Toolbar from './Toolbar'
import TaskInputs from './TaskInputs'

export default class extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  render() {
    const btn = this.props.data ? 'Save' : 'Add';
    return (
     <Page renderToolbar = {this.renderToolbar} >
        <TaskInputs data = {this.props.data} pushPage = {this.props.pushPage} />
        <div style={{padding: '16px'}}>
          <Button ripple = {true} modifier = 'large' > {btn} </Button>
        </div>
      </Page>
    );
  }

}
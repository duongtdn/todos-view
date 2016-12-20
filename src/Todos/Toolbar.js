"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    const newBtn = this.props.platform === 'android' ? 
      <span />: 
      <ToolbarButton onClick = {this.props.newTodoHandler}> 
        New
      </ToolbarButton>;
    return (
      <Toolbar>
        <div className = 'left'>
          <ToolbarButton> 
            <Icon icon = 'md-menu' /> &nbsp;
          </ToolbarButton>
        </div>
        <div className = 'center'> Todos </div>
        <div className = 'right'>
          {newBtn}
        </div>
      </Toolbar>
    );
  }

}
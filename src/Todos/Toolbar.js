"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Toolbar, ToolbarButton, Icon, Fab} from 'react-onsenui';

export default class extends Component {

  render() {
    const newBtn = this.props.platform === 'android' ? 
      <span />: 
      <ToolbarButton> New <Icon icon = 'md-plus' /> </ToolbarButton>;
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
"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Toolbar, ToolbarButton, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    return (
      <Toolbar>
        <div className = 'left'>
          <ToolbarButton> <Icon icon = 'md-menu' /> </ToolbarButton>
        </div>
        <div className="center"> Todos </div>
        <div className = 'right'>
          <ToolbarButton> <Icon icon = 'md-plus' /> New </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

}
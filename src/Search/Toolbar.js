"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, BackButton, Input, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    const lbl = this.props.platform === 'android' ? 
      <Input type = 'search' placeholder = 'search by email' /> :
      <span> Search </span>;
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton>
        </div>
        <div className = 'center'>  
          <Input type = 'search' placeholder = 'search by email' />
        </div>
      </Toolbar>
    );
  }

}
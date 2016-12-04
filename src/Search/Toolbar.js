"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Toolbar, ToolbarButton, BackButton, Input, Icon} from 'react-onsenui';

// const doneIOS = () => <ToolbarButton>> Done </ToolbarButton>;
// const doneAndroid = () =>  <ToolbarButton> <Icon icon = 'fa-check' /> &nbsp; </ToolbarButton>;

// class doneAndroid extends 

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
          {lbl}
        </div>
      </Toolbar>
    );
  }

}
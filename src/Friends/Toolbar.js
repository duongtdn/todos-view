"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Toolbar, ToolbarButton, BackButton, Input, Icon} from 'react-onsenui';

// const doneIOS = () => <ToolbarButton>> Done </ToolbarButton>;
// const doneAndroid = () =>  <ToolbarButton> <Icon icon = 'fa-check' /> &nbsp; </ToolbarButton>;

// class doneAndroid extends 

export default class extends Component {

  render() {
    const doneBtn = this.props.platform === 'android' ? 
      <ToolbarButton> <Icon icon = 'fa-check' /> &nbsp; </ToolbarButton> :
      <ToolbarButton> Done </ToolbarButton>;
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton>
        </div>
        <div className = 'center'>  
          {this.props.title}
        </div>
        <div className = 'right'>  
          <ToolbarButton> <Icon icon = 'fa-search' onClick = {() => this.props.pushPage('search')} /> &nbsp; </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

}
"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, BackButton, Input, Icon} from 'react-onsenui';

import AutofocusInput from '../Components/AutofocusInput'

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
          <AutofocusInput type = 'search' placeholder = 'search by email' 
                          onChange = {e => this.props.handleSearchInput(e.target.value)} 
                          onKeyUp = { e => this.props.handleKeyUp(e.keyCode, e.target.value)} />
        </div>
      </Toolbar>
    );
  }

}
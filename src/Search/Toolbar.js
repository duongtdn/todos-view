"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, BackButton, Icon} from 'react-onsenui'

import AutofocusInput from '../Components/AutofocusInput'

export default class extends Component {

  render() {
    const lbl = this.props.platform === 'android' ? 
      <AutofocusInput type = 'search' placeholder = 'search by email' /> :
      <span> Search </span>;
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
                          onKeyUp = { e => this.props.handleKeyUp(e.keyCode)} />
        </div>
      </Toolbar>
    );
  }

}
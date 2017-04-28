"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, BackButton, Input, Icon} from 'react-onsenui';


export default class extends Component {

  render() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton onClick = {() => this.back()} > 
            Back
          </BackButton>
        </div>
        <div className = 'center'>  
          <Input type = 'search' placeholder = 'search by email' 
                          onClick = {e => e.stopPropagation()}
                          onFocus = {this.props.onFocusSearchBox}
                          onChange = {e => this.props.handleSearchInput(e.target.value)} 
                          onKeyUp = { e => this.props.handleKeyUp(e.keyCode, e.target.value)} />
        </div>
      </Toolbar>
    );
  }

  back() {
    this.props.addToShareList();
    this.props.popPage().catch(err => console.log(err));
  }

}
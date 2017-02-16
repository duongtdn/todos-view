"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, BackButton, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    const btn = this.props.edit ? 
      <ToolbarButton ripple = {true} modifier = 'quiet' 
              onClick = {this.props.saveTodo} > 
              Save 
      </ToolbarButton> : 
      <ToolbarButton ripple = {true} modifier = 'quiet' 
              onClick = {this.props.addTodo} > 
              Add 
      </ToolbarButton>;
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
        <div className = 'center'> {this.props.title} </div>
        <div className = 'right' >
          {btn}
        </div>
      </Toolbar>
    );
  }

}
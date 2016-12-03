"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Toolbar, ToolbarButton, BackButton, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
        <div className = 'center'> {this.props.title} </div>
      </Toolbar>
    );
  }

}
"use strict"

import React , { Component } from 'react'

import {Toolbar, ToolbarButton, Icon} from 'react-onsenui';

export default class extends Component {

  render() {
    const newBtn = this.props.platform === 'android' ? 
      <span />: 
      <ToolbarButton onClick = {this.props.newTodoHandler}> 
        New
      </ToolbarButton>;

      const badge = this.props.msgCount > 0 ? 
                  this.props.msgCount < 10 ?  
                    <label className = {`badge menu-badge-${this.props.platform}`}> {this.props.msgCount} </label>:
                    <label className = {`badge menu-badge-${this.props.platform}`}> 9+ </label>
                  :
                  null;
    return (
      <Toolbar>
        <div className = 'left'>
          <ToolbarButton onClick = {this.props.openSideMenu} > 
            <Icon icon = 'md-menu' /> &nbsp; {badge}
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
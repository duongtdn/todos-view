"use strict"

import React , { Component } from 'react'
import { Page, Fab } from 'react-onsenui'

import { connect } from 'react-redux'
import { user, currentTodo } from 'todos-data'

import Toolbar from './Toolbar'
import Tabbar from './Tabbar'

class Todos extends Component {

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderFixed = this.renderFixed.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} 
               newTodoHandler = {this.newTodo} 
               openSideMenu = {this.openSideMenu} />
    );
  }

  renderFixed() {
    if (this.props.platform === 'android') {
      return (
        <Fab position = 'bottom right' onClick = {this.newTodo} > + </Fab>
      );
    } else {
      return null;
    }  
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar}
            renderFixed = {this.renderFixed}
       >
        <Tabbar platform = {this.props.platform} pushPage = {this.props.pushPage} />
      </Page>
    );
  }

  newTodo() {
    this.props.updateCurrentTodo(null);
    this.props.pushPage('editor', null);
  }

  openSideMenu() {
    // temporary signout
    this.props.signOut();
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentTodo(todo) {
      dispatch(currentTodo.update(todo));
    },
    signOut() {
      dispatch(user.signOut());
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Todos)
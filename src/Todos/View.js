"use strict"

import React , { Component } from 'react'
import { Page, Fab, Splitter, SplitterSide, SplitterContent } from 'react-onsenui'

import { connect } from 'react-redux'
import { user, currentTodo } from 'todos-data'

import Toolbar from './Toolbar'
import Tabbar from './Tabbar'
import SideMenu from './Sidebar/Menu'

class Todos extends Component {

  constructor(props) {
    super(props);

    this.state = { isSidebarOpen : false };

    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderFixed = this.renderFixed.bind(this);
    this.newTodo = this.newTodo.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} 
               newTodoHandler = {this.newTodo} 
               openSideMenu = {this.showSidebar} />
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
      <Splitter>

        <SplitterSide side ='left' 
                      collapse = {true}
                      isSwipeable = {true}
                      isOpen = {this.state.isSidebarOpen}
                      onClose = {this.hideSidebar}
                      style={{
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                      }} >
          <SideMenu signOut = {this.signOut} />
        </SplitterSide>

        <SplitterContent>
          <Page renderToolbar = {this.renderToolbar}
                renderFixed = {this.renderFixed}
          >
            <Tabbar platform = {this.props.platform} pushPage = {this.props.pushPage} />
          </Page>
          </SplitterContent>

      </Splitter>
    );
  }

  newTodo() {
    this.props.updateCurrentTodo(null);
    this.props.pushPage('editor', null);
  }

  showSidebar() {
    // temporary signout
    // this.props.signOut();
    this.setState({ isSidebarOpen : true });
  }

  hideSidebar() {
    this.setState({ isSidebarOpen : false });
  }

  signOut() {
    this.hideSidebar();
    this.props.signOut();
    this.props.resetPage('login');
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
"use strict"

import React , { Component } from 'react'

import { Page, Icon} from 'react-onsenui'

import { connect } from 'react-redux'
import {auth, user, todos } from 'todos-data'

class SyncView extends Component {

  constructor(props) {
    super(props);
    this.shouldSyncTodo= true;
  }

  componentDidMount() {
    if (auth.currentUser && auth.currentUser.uid) {
      this.props.loadUser();
    }
  }

  componentDidUpdate() {
    const resetTodo = () => {
      this.props.resetPage('todos').catch(err => {
        /* not finish animation, wait at least 100ms then retry */
        setTimeout(() => resetTodo(), 100);
      });
    }
    if (this.props.user && this.shouldSyncTodo) {
      this.shouldSyncTodo = false; // prevent run twice
      this.props.loadTodos().then(() => {
        resetTodo();
      });
    };
  }

  render() {
    return (
      <Page>
        <div className = 'sync-info' >
          <div>
            <h3 className = 'center' > LOADING </h3>
          </div>
          <div>
            <Icon icon = 'md-spinner' size ={48} spin />
          </div>
        </div>
      </Page>
    );
  }



}

/* Container */

const mapStateToProps = state => {  
  return { 
    user : state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser() {
      return dispatch(user.load());
    },
    loadTodos() {
      return dispatch(todos.fetch());
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SyncView)
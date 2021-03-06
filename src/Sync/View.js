"use strict"

import React , { Component } from 'react'

import { Page, Icon, Button} from 'react-onsenui'

import { connect } from 'react-redux'
import {auth, user, todos, connection, taskGroup } from 'todos-data'
import ad from '../ad'

class SyncView extends Component {

  constructor(props) {
    super(props);

    this.state = { conn : true };

    this.shouldSyncTodo= true;

    this.tryLoadUser = this.tryLoadUser.bind(this);
    this.retryLoadUser = this.retryLoadUser.bind(this);
    this.tryLoadTodos = this.tryLoadTodos.bind(this);
    this.tryLoadTaskGroup = this.tryLoadTaskGroup.bind(this);
    this.relogin = this.relogin.bind(this);
  }

  componentDidMount() {
    this.retryLoadUser();
  }

  componentDidUpdate() {
    // this.tryLoadTodos();
  }

  render() {
    if (this.state.conn) {
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
    } else {
      return (
        <Page>
          <div className = 'sync-info' >
            <div>
              <h3 className = 'center' > CANNOT CONNECT TO SERVER </h3>
            </div>
            <div style ={{margin : 0}}>
              <Button onClick = {this.retryLoadUser} > Retry </Button>
            </div>
            <div style ={{margin : 0, paddingTop: '35px'}}>
              <Button onClick = {this.relogin} > Re Login </Button>
            </div>
          </div>
        </Page>
      );
    }
  }

  retryLoadUser() {
    this.setState({conn : true});
    let attemp = 0;

    const retry = () => {
      this.props.checkConnection().then(() => {
        this.tryLoadUser();
        this.setState({ conn : true }); 
      }).catch(() => {
        attemp++;
        if (attemp < 100) {   // try 100 times, each check 100ms
          setTimeout(() => retry(), 100);
        } else {
          this.setState({ conn : false });
        }    
      });
    };

    retry();

  }

  tryLoadUser() {
    if (auth.currentUser && auth.currentUser.uid) {
      this.props.loadUser().then(() => {
        this.tryLoadTaskGroup();
      });
    }    
  }

  tryLoadTaskGroup() {
    this.props.loadTaskGroup().then(() => {
      this.tryLoadTodos();
    })
  }

  tryLoadTodos() {
    const resetTodo = () => {
      this.props.resetPage('todos').catch(err => {
        /* not finish animation, wait at least 100ms then retry */
        setTimeout(() => resetTodo(), 100);
      });
    }
    if (this.props.user && this.shouldSyncTodo) {
      this.shouldSyncTodo = false; // prevent run twice
      this.props.loadTodos().then(() => {
        ad.showBanner();
        resetTodo();
      });
    };
  }

  relogin() {
    this.props.resetPage('login');
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    user : state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser() {
      return dispatch(user.load());
    },
    loadTodos() {
      return dispatch(todos.fetch());
    },
    loadTaskGroup() {
      return dispatch(taskGroup.fetch());
    },
    checkConnection() {
      return dispatch(connection.check());
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SyncView)
"use strict"

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {auth, store, user, todos } from 'todos-data'

import AppView from './AppView'
console.log ('loaded');
// hook for test
auth.onAuthStateChanged(usr => {
  if (usr) {
    console.log ('user logged in');
    console.log (usr.email);
    store.dispatch(user.load()).then( user => {
      store.dispatch(todos.fetch());
    });
  } else {
    console.log ('no logged user');
    store.dispatch(user.signIn('duongtdn@stormgle.com', '123456'));
  }
});


export default class extends Component {
  render() {
    return (
      <Provider store = {store} >
        <AppView platform = {this.props.platform} />
      </Provider>
    );
  }
}
"use strict"

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {auth, store, user, todos } from 'todos-data'

import AppView from './AppView'


export default class extends Component {
  render() {
    return (
      <Provider store = {store} >
        <AppView platform = {this.props.platform} />
      </Provider>
    );
  }
}
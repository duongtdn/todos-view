"user strict"

import React , { Component } from 'react'
import { render } from 'react-dom'
import ons from 'onsenui'
import { auth } from 'todos-data'

import App from './App'

export default {

  platform : null,
  rootEl : 'app-root',
  ready : false,
  taskQueue: [],

  setPlatform (platform) {
    ons.platform.select(platform);
    this.platform = platform;
    return this;
  },

  setRootElement (val) {
    this.rootEl = val;
    return this;
  },

  init() {
    if (this.platform === null) { 
      this.platform = ons.platform.isAndroid() ? 'android' : 'ios';
    }
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    return this;    
  },

  onDeviceReady() {
    this.receivedEvent('deviceready');
  },

  receivedEvent(event) {
    if (event === 'deviceready') {
      // mark internal state as ready
      this.ready = true;
      // load react element dpending login status 
      auth.onAuthStateChanged(user => {
        if (user) {
          render(
            <App platform = {this.platform} isLogged = {true} />, 
            document.getElementById(this.rootEl)
          );
        } else {
          render(
            <App platform = {this.platform} isLogged = {false} />, 
            document.getElementById(this.rootEl)
          );
        }
      });
      // exec queue func if any
      if (this.taskQueue.length !== 0) {
        // exec all task in queue, then empty the queue
        this.taskQueue.forEach(task => task());
        this.taskQueue = [];
      }
    }
    
  },

  exec(fn) {
    if (this.ready) {
      fn();
    } else {
      this.taskQueue.push(fn);
    }  
  }      

}
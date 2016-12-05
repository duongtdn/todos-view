"user strict"

import React , { Component } from 'react'
import { render } from 'react-dom'
import ons from 'onsenui'

import AppView from './AppView'

export default {

  platform : '',
  rootEl : 'app-root',
  
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
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    return this;    
  },

  onDeviceReady() {
    this.receivedEvent('deviceready');
  },

  receivedEvent() {
    render(<AppView platform = {this.platform} />, document.getElementById(this.rootEl));
  }      

}
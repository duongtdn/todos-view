"user strict"

import React , { Component } from 'react'
import { render } from 'react-dom'
import ons from 'onsenui'

import App from './App'

export default {

  platform : null,
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
    if (this.platform === null) { 
      this.platform = ons.platform.isAndroid() ? 'android' : 'ios';
    }
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    return this;    
  },

  onDeviceReady() {
    this.receivedEvent('deviceready');
  },

  receivedEvent() {
    render(<App platform = {this.platform} />, document.getElementById(this.rootEl));
  }      

}
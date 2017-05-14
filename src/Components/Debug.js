"use strict"

import React, { Component } from 'react'

import app from '../exporter'

const style = {
  position: 'fixed',
  bottom: 0,
  right: 0,
};

const events = [
      'onAppPause', 'onAppResume',
      'onAdLoaded', 'onAdFailedToLoad', 'onAdOpened', 'onAdClosed', 'onAdLeftApplication',
    ];


export default class Debug extends Component {
  constructor(props) {
    super(props);

    this.state = { ad: '', ts: 0, conn: ''};
    events.forEach( event => this.state[event] = 0 );
   
    events.forEach(method => {

      /* define method */
      this[method] = function() {
        const state  = {};
        state[method] = this.state[method] + 1;
        this.setState(state);
        // time counter for ad loaded
        if (method === 'onAdLoaded') {
          this.setState({ts: 0});
        }
      }

      /* binding scope */
      this[method] = this[method].bind(this);
    });

  }

  componentWillMount() {
    function alertConn(networkState) {
      const states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      this.setState({conn : 'Connection type: ' + states[networkState]});
    }

    setInterval(() => {
      this.setState({ ts: this.state.ts +1 });
    }, 1000);

  }

  componentDidMount() {
    /* App goes to background or foreground */
    document.addEventListener('pause', this.onAppPause, false);
    document.addEventListener('resume', this.onAppResume, false);
    /* Ad events */
    const ad = app.plugin('ad');
    if (ad) {
      this.setState({ ad: `admob`});
      ['onAdLoaded', 'onAdFailedToLoad', 'onAdOpened', 'onAdClosed', 'onAdLeftApplication'].forEach( event => {
        document.addEventListener(ad.getEvents()[event], this[event], false);
      });
    } else {
      this.setState({ ad: 'no ad plugin '});
    }
  }

  render() {
    return (
      <div style = {style} >
        <p> Time : {this.state.ts} </p>
        <p> app goes in background : {`${this.state.onAppPause}`} </p>
        <p> app goes in foreground : {`${this.state.onAppResume}`} </p>
        <p> ad : {`${this.state.ad}`} </p>
        <p> ad loaded : {`${this.state.onAdLoaded}`} </p>
        <p> ad opened : {`${this.state.onAdOpened}`} </p>
        <p> ad closed : {`${this.state.onAdClosed}`} </p>
      </div>
    );
  }


}
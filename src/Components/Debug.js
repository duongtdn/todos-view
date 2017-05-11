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

    this.state = { ad : ''};
    events.forEach( event => this.state[event] = 0 );
   
    events.forEach(method => {

      /* define method */
      this[method] = function() {
        const state  = {};
        state[method] = this.state[method] + 1;
        this.setState(state);
      }

      /* binding scope */
      this[method] = this[method].bind(this);
    });

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
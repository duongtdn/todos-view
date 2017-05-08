"use strict"

import { store } from 'todos-data'
import app from './exporter'

let interstitialAdWait = 0;

export default {

  showBanner() {
    const state = store.getState();
    /* for user with props no ad */
    if (state.user && state.user.account && state.user.account.props.noAd) {
      return;
    }
    if (app && app.plugin('ad')) {
      app.plugin('ad').showBottomBanner();
    }
  },

  showInterstitial() {
    // not show ad every times
    interstitialAdWait++;
    if (interstitialAdWait < 3) {
      return;
    } 

    const state = store.getState();
    /* for user with props no ad */
    if (state.user && state.user.account && state.user.account.props.noAd) {
      return;
    }

    if (app && app.plugin('ad')) {   
      app.plugin('ad').showInterstitial(() => {interstitialAdWait = 0;});
    }
  },

  hideBanner() {
    if (app && app.plugin('ad')) {   
      app.plugin('ad').hideBanner();
    }
  }

}
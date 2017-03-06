"use strict"

import { store } from 'todos-data'
import app from './exporter'

export default {

  loadBanner() {
    const state = store.getState();
    if (state.user && state.user.account && state.user.account === 'premium') {
      return;
    }
    if (app && app.plugin('ad')) {
      app.plugin('ad').showBottomBanner();
    }
  },

  loadInterstitial() {
    const state = store.getState();
    if (state.user && state.user.account && state.user.account === 'premium') {
      return;
    }
    if (app && app.plugin('ad')) {   
      app.plugin('ad').showInterstitial();
    }
  }

}
"use strict"

import app from './exporter'

export default {

  loadBanner() {
    if (app && app.plugin('ad')) {
      app.plugin('ad').showBottomBanner();
    }
  },

  loadInterstitial() {
    if (app && app.plugin('ad')) {   
      app.plugin('ad').showInterstitial();
    }
  }

}
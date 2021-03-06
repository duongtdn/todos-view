"use strict"

import React , { Component } from 'react'
import { Navigator } from 'react-onsenui'

import routes from './routes'
import SceneView from './SceneView'
import ad from './ad'


export default class AppView extends Component {

  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);
  }

  renderPage(route, navigator) {
    return (
      <SceneView key = {route.name}
        navigator = {navigator} 
        route = {route} 
        platform = {this.props.platform}        
      />
    );
  }

  render() {
    const initRoute = this.props.isLogged ? routes.sync : routes.login;
    return (
      <Navigator
        animation = 'slide'
        renderPage = {this.renderPage}
        initialRoute = {initRoute} 
        onPrePop = {nav => this.onPrePop(nav.routes.poppingRoute)}
      />        
    );
  }

  onPrePop(route) {
    // if (route.name !== 'friends') {
    //   ad.showInterstitial();
    // }
  }

}
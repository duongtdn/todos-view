"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'
import { Page } from 'react-onsenui'

import Tabbar from './Tabbar'

export default class extends Component {

  render() {
    return (
      <Page  >
        <Tabbar/>
      </Page>
    );
  }
}
"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Page, Tabbar, Tab, Icon} from 'react-onsenui';

class TabView extends Component {
  render() {
    return (
      <Page>
        <p> This is <strong>{this.props.title}</strong> Tab </p>
      </Page>
    );
  }
}

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { index : 0 };
    this.onPreChange = this.onPreChange.bind(this);
  }

  renderTabs() {
    return [
      {
        content : <TabView key = 'Listing' title = 'Listing' />,
        tab : <Tab key = 'Listing' label = 'List' />
      },
      {
        content : <TabView key = 'Trash' title = 'Trash' />,
        tab : <Tab key = 'Trash' label = 'Trash' />
      }
    ]
  }

  onPreChange(event) {
    if (event.index != this.state.index) {
      this.setState({index: event.index});
    }
  }

  render() {
    return (
      <Tabbar
        index = {this.state.index}
        onPreChange = {this.onPreChange}
        renderTabs = {this.renderTabs} 
      />
    );
  }

}
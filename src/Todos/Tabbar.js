"use strict"

import React , { Component } from 'react'
import {Page, Tabbar, Tab, Icon} from 'react-onsenui';

import ListTab from './ListTab'

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
        content : <ListTab key = 'Pending' />,
        tab : <Tab key = 'Pending' label = 'Pending' />
      },
      {
        content : <TabView key = 'Completed' title = 'Completed' />,
        tab : <Tab key = 'Completed' label = 'Completed' />
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
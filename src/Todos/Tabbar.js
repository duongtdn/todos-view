"use strict"

import React , { Component } from 'react'
import {Page, Tabbar, Tab, Icon} from 'react-onsenui';

import PendingList from './PendingList'
import CompletedList from './CompletedList'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { index : 0 };
    this.onPreChange = this.onPreChange.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  renderTabs() {
    return [
      {
        content : <PendingList key = 'Pending' platform = {this.props.platform} />,
        tab : <Tab key = 'Pending' label = 'Pending' />
      },
      {
        content : <CompletedList key = 'Completed' platform = {this.props.platform}/>,
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
        position = 'auto'
        animation = 'slide'
        index = {this.state.index}
        onPreChange = {this.onPreChange}
        renderTabs = {this.renderTabs} 
      />
    );
  }

}
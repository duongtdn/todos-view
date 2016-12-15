"use strict"

import React , { Component } from 'react'
import {Page, Tabbar, Tab, Icon} from 'react-onsenui';

import PendingTasksContainer from './PendingTasksContainer'
import CompletedTasksContainer from './CompletedTasksContainer'

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
        content : <PendingTasksContainer key = 'Pending' platform = {this.props.platform} pushPage = {this.props.pushPage} />,
        tab : <Tab key = 'Pending' label = 'Pending' />
      },
      {
        content : <CompletedTasksContainer key = 'Completed' platform = {this.props.platform}/>,
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
        animation = 'none'
        index = {this.state.index}
        onPreChange = {this.onPreChange}
        renderTabs = {this.renderTabs} 
      />
    );
  }

}
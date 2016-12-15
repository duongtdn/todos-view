"use strict"

import React , { Component } from 'react'
import { Page, List } from 'react-onsenui'

import Task from './Task'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTask : {}
    };
    this.renderRow = this.renderRow.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.openEditPage = this.openEditPage.bind(this);
    this.openSharePage = this.openSharePage.bind(this);

  }

  renderRow(row, index) {
    return (
      <Task data = {row} 
            platform = {this.props.platform} 
            key = {row.id}
            active = {this.state.activeTask[row.id]}
            setActive = {this.setActiveTask} 
            openEditPage = {this.openEditPage}
            openSharePage = {this.openSharePage}
            completeTodo = {this.props.completeTodo}
            deleteTodo = {this.props.deleteTodo}
      />
    );
  }

  render() {
    return (
      <Page>
        <List
          dataSource = {this.props.todos}
          renderRow = {this.renderRow}
        />
      </Page>
    );
  }

  setActiveTask(id) {
    const activeTask = {};
    for (let taskId in this.state.activeTask) {
      activeTask[taskId] = false;
    }
    activeTask[id] = true;    
    this.setState({ activeTask });
  }

  openEditPage(data) {
    this.props.pushPage('editor', data, {
      animation : 'lift'
    });
  }

  openSharePage(data) {
    console.log('open share page');
  }

}

"use strict"

import React , { Component } from 'react'
import {Page, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

import Task from './Task'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation : [],
      showEditMenu : [],
      activeTask : {}
    };
    this.renderRow = this.renderRow.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.openEditPage = this.openEditPage.bind(this);
    this.openSharePage = this.openSharePage.bind(this);

  }

  componentWillReceiveProps(nextProps) {  
    const showEditMenu = this.props.todos.map( () => {
      return `todos-action-${this.props.platform} hide`;
    });
    const animation = this.props.todos.map( () => {
      return '';
    });
    this.setState({ showEditMenu, animation });
  }

  renderRow(row, index) {
    const isComplete = (row.status === 'completed');
    return (
      <Task data = {row} 
            platform = {this.props.platform} 
            key = {row.id}
            active = {this.state.activeTask[row.id]}
            setActive = {this.setActiveTask} 
            openEditPage = {this.openEditPage}
            openSharePage = {this.openSharePage}
            completeTodo = {this.props.completeTodo}
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

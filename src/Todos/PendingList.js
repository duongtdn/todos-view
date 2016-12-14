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

    this.completeTodo = this.completeTodo.bind(this);
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
    const numberOfShare = Object.keys(row.share).length; 
    const type = numberOfShare > 1 ? `${numberOfShare} shared` : 'private';
    const bgHighlight = row.urgent ? 'todos-highlight' : '';
    const isComplete = (row.status === 'completed');
    const decoText = (row.status === 'completed') ? 'todos-text todos-completed' : 'todos-text'
    return (
      <Task data = {row} 
            platform = {this.props.platform} 
            key = {row.id}
            active = {this.state.activeTask[row.id]}
            setActive = {this.setActiveTask} 
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

  openEditPage(index) {
    this.props.pushPage('editor', this.props.todos[index], {
      animation : 'lift'
    });
  }

  openSharePage(index) {
    console.log('open share page');
  }

  completeTodo(todo, index) {
    const animation = this.state.animation.map( (anim, id) => {
      if (id === index) {
        return 'animation-swipe-right hide-children';
      } else {
        return anim;
      }
    });
    this.setState({ animation });

    setTimeout(() => {
      this.props.completeTodo(todo);
    }, 950);
    
  }

}

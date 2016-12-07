"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon} from 'react-onsenui'

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import Toolbar from './Toolbar'
import TaskInputs from './TaskInputs'

export default class TodoEditor extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  render() {
    const btn = this.props.data ? 'Save' : 'Add';
    return (
     <Page renderToolbar = {this.renderToolbar} >
        <TaskInputs data = {this.props.data} pushPage = {this.props.pushPage} getTodoText = {val => console.log(val)} />
        <div style={{padding: '16px'}}>
          <Button ripple = {true} modifier = 'large' onClick = {() => { this.props.addTodo(todo) }} > {btn} </Button>
        </div>
      </Page>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addTodo(todo) {
      dispatch(todos.add(todo));
    }
  }
};
"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon} from 'react-onsenui'

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import Toolbar from './Toolbar'
import TaskInputs from './TaskInputs'

class TodoEditor extends Component {
  constructor(props) {
    super(props);

    this.todo = {};

    this.renderToolbar = this.renderToolbar.bind(this);
    this.getTodoText = this.getTodoText.bind(this);
    this.getTodoUrgent = this.getTodoUrgent.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  renderToolbar() {
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  componentWillMount() {
    if (this.props.data) {
      this.todo = this.props.data;
    } else {
      this.todo = {
        text    : '',
        urgent  : false,
        share   : []
      };
    }
    console.log (this.todo);
  }

  render() {
    const btn = this.todo.id ? 
      <Button ripple = {true} modifier = 'large' 
              onClick = {() => { this.props.saveTodo(this.todo) }} > 
              Save 
      </Button> : 
      <Button ripple = {true} modifier = 'large' 
              onClick = {this.addTodo} > 
              Add 
      </Button>;
    return (
     <Page renderToolbar = {this.renderToolbar} >
        <TaskInputs data = {this.todo} 
                    pushPage = {this.props.pushPage} 
                    getTodoText = {this.getTodoText}
                    getTodoUrgent = {this.getTodoUrgent} />
        <div style={{padding: '16px'}}>
          {btn}
        </div>
      </Page>
    );
  }

  getTodoText(text) {
    this.todo.text = text;
  }

  getTodoUrgent(urgent) {
    this.todo.urgent = urgent;
  }

  addTodo() {
    this.props.addTodo(this.todo);
    this.props.popPage();
  }

}

const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo(todo) {
      dispatch(todos.add(todo));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TodoEditor)
"use strict"

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import CompletedTasks from './CompletedTasks'

const mapStateToProps = state => {
  const todos = [];
  for (let todoId in state.todos) {
    if (state.todos[todoId].status === 'completed') {
      todos.push(state.todos[todoId]);
    }    
  }
  return { todos };
};

const mapDispatchToProps = dispatch => {
  return {
    undoComplete(todo) {
      dispatch(todos.undoComplete(todo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasks)
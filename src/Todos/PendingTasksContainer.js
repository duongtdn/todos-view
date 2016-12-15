"use strict"

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import PendingTasks from './PendingTasks'

const mapStateToProps = state => {
  const todos = [];
  for (let todoId in state.todos) {
    if (state.todos[todoId].status === 'pending') {
      todos.push(state.todos[todoId]);
    }    
  }
  return { todos };
};

const mapDispatchToProps = dispatch => {
  return {
    completeTodo(todo) {
      dispatch(todos.complete(todo));
    },
    deleteTodo(todo) {
      dispatch(todos.delete(todo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTasks)
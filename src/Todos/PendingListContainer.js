"use strict"

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import PendingList from './PendingList'

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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingList)
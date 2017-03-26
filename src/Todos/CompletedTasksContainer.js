"use strict"

import { connect } from 'react-redux'
import { todos } from 'todos-data'

import CompletedTasks from './CompletedTasks'

const mapStateToProps = state => {
  const todos = [];
  let filterGroup = '';
  if (state.filter.id && state.filter.id !== '_0_') {
    filterGroup = state.filter.id;
  }
  for (let todoId in state.todos) {
    if ( filterGroup.length === 0 || 
      ( state.todos[todoId].group && 
        state.todos[todoId].group === filterGroup)) {
      if (state.todos[todoId].status === 'completed') {
        todos.push(state.todos[todoId]);
      }  
    }  
  }
  const friends = state.user.friends;
  const auth = state.user.auth;
  return { todos, friends, auth };
};

const mapDispatchToProps = dispatch => {
  return {
    undoComplete(todo) {
      dispatch(todos.undoComplete(todo));
    },
    deleteTodo(todo) {
      dispatch(todos.delete(todo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasks)
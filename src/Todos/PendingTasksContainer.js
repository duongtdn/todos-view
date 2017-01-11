"use strict"

import { connect } from 'react-redux'
import { todos, currentTodo } from 'todos-data'

import PendingTasks from './PendingTasks'

const mapStateToProps = state => {
  const todos = [];
  for (let todoId in state.todos) {
    if (state.todos[todoId].status === 'pending') {
      todos.push(state.todos[todoId]);
    }    
  }
  todos.sort( (a, b) => {
    if (a.urgent && b.urgent) {
      // both are urgent, sort by duedate
      return a.dueDate - b.dueDate;
    }
    if (a.urgent) {
      // only a is urgent
      return -1;
    }
    if (b.urgent) {
      // only b is urgent
      return 1;
    }
    if (a.dueDate && !b.dueDate) {
      // b has no due date
      return -1;
    }
    if (!a.dueDate && b.dueDate) {
      // a has no due date
      return 1;
    }
    // none is urgent
    return a.dueDate - b.dueDate;
  });
  return { todos };
};

const mapDispatchToProps = dispatch => {
  return {
    completeTodo(todo) {
      dispatch(todos.complete(todo));
    },
    deleteTodo(todo) {
      dispatch(todos.delete(todo));
    },
    updateCurrentTodo(todo) {
      dispatch(currentTodo.update(todo));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTasks)
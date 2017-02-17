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

    function sortBy(key, a, b, nextSortFn) {
      console.log(key);
      console.log(`${a.text}  -   ${b.text}`)
      if (a[key] && b[key]) {
        return nextSortFn(a, b);
      }
      if (a[key]) {
        // a[key] exist but not b[key]
        return -1;
      }
      if (b[key]) {
        // b[key] exist but not a[key]
        return 1;
      }
      // none has key defined
      return nextSortFn(a, b);
    }

    function sortByDueDate(a, b) {
      return sortBy('dueDate', a, b, (a, b) => a.dueDate - b.dueDate);
    }

    function sortByUrgent(a, b, nextSortFn) {
      return sortBy('urgent', a, b, (a, b) => sortByDueDate(a, b));
    }
    
    return sortByUrgent(a, b);
    
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
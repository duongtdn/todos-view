"use strict"

import { connect } from 'react-redux'
import { todos, currentTodo } from 'todos-data'

import PendingTasks from './PendingTasks'

const mapStateToProps = state => {
  const todos = [];
  let filterGroup = '';
  if (state.filter.id && state.filter.id !== '_0_') {
    filterGroup = state.filter.id;
  }
  // if group is not in the list (maybe because of deleted), apply no filter
  if (!state.taskGroup[filterGroup]) {
    filterGroup = '';
  }
  for (let todoId in state.todos) {
    if ( filterGroup.length === 0 || 
         ( state.todos[todoId].group && 
           state.todos[todoId].group === filterGroup)) {
      if (state.todos[todoId].status === 'pending') {
        todos.push(state.todos[todoId]);
      }
    }       
  }
  todos.sort( (a, b) => {

    function sortBy(key, a, b, nextSortFn) {
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
  return { 
    todos, 
    filter : state.filter,
    taskGroup : state.taskGroup
  };
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
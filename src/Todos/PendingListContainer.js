"use strict"

import { connect } from 'react-redux'

import PendingList from './PendingList'

const mapStateToProps = state => {
  const todos = [];
  for (let todoId in state.todos) {
    todos.push(state.todos[todoId]);
  }
  return { todos };
};

const mapDispatchToProps = dispatch => {
  return {
    
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingList)
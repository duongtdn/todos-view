"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon} from 'react-onsenui'

import { connect } from 'react-redux'
import { todos, currentTodo } from 'todos-data'

import Toolbar from './Toolbar'
import TaskInputs from './TaskInputs'

class TodoEditor extends Component {
  constructor(props) {
    super(props);

    this.todo = {};

    this.renderToolbar = this.renderToolbar.bind(this);
    this.getTodoFromProps = this.getTodoFromProps.bind(this);
    this.getTodoText = this.getTodoText.bind(this);
    this.getTodoUrgent = this.getTodoUrgent.bind(this);
    this.getDueDate = this.getDueDate.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.inviteFriends = this.inviteFriends.bind(this);
    this.unshare = this.unshare.bind(this);
  }

  renderToolbar() {
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  componentWillMount() {
    this.getTodoFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getTodoFromProps(nextProps);
  }

  getTodoFromProps(props) {
    if (props.currentTodo) {
      // deep copy currentTodo into internal todo */
      const share = {...props.currentTodo.share};
      this.todo = {...props.currentTodo};
      this.todo.share = share;
    } else {
      this.todo = {
        text    : '',
        urgent  : false,
        share   : {}
      };
    }
  }

  render() {
    const btn = this.todo.id ? 
      <Button ripple = {true} modifier = 'large' 
              onClick = {this.saveTodo} > 
              Save 
      </Button> : 
      <Button ripple = {true} modifier = 'large' 
              onClick = {this.addTodo} > 
              Add 
      </Button>;
    return (
     <Page renderToolbar = {this.renderToolbar} >
        <TaskInputs data = {this.todo} 
                    auth = {this.props.auth}
                    friends = {this.props.friends}
                    pushPage = {this.props.pushPage} 
                    getTodoText = {this.getTodoText}
                    getTodoUrgent = {this.getTodoUrgent} 
                    getDueDate = {this.getDueDate}
                    inviteFriends = {this.inviteFriends}
                    unshare = {this.unshare}
                    />
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

  getDueDate(date) {
    this.todo.dueDate = date.timestamp;
  }

  addTodo() {
    const todo = {...this.todo};
    const share = [];
    for (let uid in this.todo.share) {
      if (this.todo.share[uid] !== null) {
        share.push(uid);
      }
    }
    todo.share = share;
    this.props.addTodo(todo);
    this.props.popPage();
  }

  saveTodo() {
    this.props.editTodo(this.todo);
    this.props.popPage();
  }

  inviteFriends() {
    this.props.pushPage('friends',this.todo);
  }

  unshare(id) {
    if (this.todo.share[id]) {
      this.todo.share[id] = null;
      this.props.updateCurrentTodo(this.todo);
    }   
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    auth : state.user.auth,
    friends : state.user.friends,
    currentTodo : state.currentTodo 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo(todo) {
      dispatch(todos.add(todo));
    },
    editTodo(todo) {
      dispatch(todos.edit(todo))
    },
    updateCurrentTodo(todo) {
      dispatch(currentTodo.update(todo));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TodoEditor)
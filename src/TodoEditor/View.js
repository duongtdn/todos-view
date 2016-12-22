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
    this.saveTodo = this.saveTodo.bind(this);
    this.inviteFriends = this.inviteFriends.bind(this);
  }

  renderToolbar() {
    const title = this.props.data ? 'Edit Todo' : 'New Todo';
    return (
      <Toolbar platform = {this.props.platform} title = {title}/>
    );
  }

  componentWillMount() {
    if (this.props.currentTodo) {
      this.todo = {...this.props.currentTodo};
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
                    inviteFriends = {this.inviteFriends}
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

  addTodo() {
    this.props.addTodo(this.todo);
    this.props.popPage();
  }

  saveTodo() {
    this.props.editTodo(this.todo);
    this.props.popPage();
  }

  inviteFriends() {
    this.props.pushPage('friends',this.todo);
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
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TodoEditor)
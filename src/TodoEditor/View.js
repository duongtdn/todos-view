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

    this.state = { hideToolbar : false };

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
    this.hideToolbar = this.hideToolbar.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.getTaskGroup = this.getTaskGroup.bind(this);
  }

  renderToolbar() {
    const title = this.props.currentTodo ? 'Edit Todo' : 'New Todo'; 
    return (
      <Toolbar platform = {this.props.platform} 
               edit = {this.todo.id ? true : false}
               title = {title}
               saveTodo = {this.saveTodo}
               addTodo = {this.addTodo} />
    );
  }

  componentWillMount() {
    this.getTodoFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getTodoFromProps(nextProps);
  }

  getTodoFromProps(props) {
    if (props.currentTodo && Object.keys(props.currentTodo).length > 0) {
      // deep copy currentTodo into internal todo */
      const share = {...props.currentTodo.share};
      this.todo = {...props.currentTodo};
      this.todo.share = share;
    } else {
      const share = {};
      share[this.props.auth.uid] = {
        id: this.props.auth.uid,
        name : this.props.auth.email,
        role: 'owner',
        status: 'accepted'
      };
      const group = { updated : '_0_' };

      if (this.props.filter && 
          Object.keys(this.props.filter).length > 0 &&
          this.props.filter.id !== '_0_') {

        const groupId = this.props.filter.id;
        const members = this.props.taskGroup[groupId].members
        for (let id in members) {
          if (share[id]) { continue }
          share[id] = {...members[id]};
          share[id].status = 'invited';
        }
        group.updated = groupId;

      }

      this.todo = {
        text    : '',
        urgent  : false,
        share,
        group,
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
      const renderToolbar = this.state.hideToolbar ?
        function() {return (null)} :
        this.renderToolbar;
    return (
     <Page renderToolbar = {renderToolbar} >
        <TaskInputs data = {this.todo} 
                    auth = {this.props.auth}
                    friends = {this.props.friends}
                    pushPage = {this.props.pushPage} 
                    getTodoText = {this.getTodoText}
                    getTodoUrgent = {this.getTodoUrgent} 
                    getDueDate = {this.getDueDate}
                    inviteFriends = {this.inviteFriends}
                    unshare = {this.unshare}
                    hideToolbar = {this.hideToolbar}
                    getTaskGroup = {this.getTaskGroup}
                    taskGroup = {this.props.taskGroup}
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
    if (date) {
      this.todo.dueDate = date.timestamp;
    }
    this.showToolbar();
  }

  getTaskGroup(group) {
    if (!group) { 
      return; 
    }
    if (!this.todo.group) {
      this.todo.group = {};
    }
    this.todo.group.updated = group.id;
    // load members in the group and merge with current list
    const share = {};
    for (let id in this.todo.share) {
      share[id] = {...this.todo.share[id]}
    }
    for (let id in this.props.taskGroup[group.id].members) {
      if (share[id]) { continue }
      share[id] = {...this.props.taskGroup[group.id].members[id]};
      share[id].status = 'invited';
    }
    this.todo.share = share;
    this.props.updateCurrentTodo(this.todo);
  }

  addTodo() {
    
    if (this.todo.text.length === 0) { 
      this.props.popPage();
      return;
    }

    const todo = {...this.todo};
    const share = [];
    for (let uid in this.todo.share) {
      if (this.todo.share[uid] !== null) {
        share.push(this.todo.share[uid]);
      }
    }
    todo.share = share;
    this.props.addTodo(todo);
    this.props.popPage();
  }

  saveTodo() {

    if (this.todo.text.length === 0) { 
      this.props.popPage();
      return;
    }

    this.props.editTodo(this.todo);
    this.props.popPage();
  }

  inviteFriends() {
    this.props.pushPage('friends',this.todo);
  }

  unshare(id) {
    if (this.todo.share[id]) {
      if (this.todo.share[id].role === 'owner') { return; }
      if ((/invited/i).test(this.todo.share[id].status)) {
        const share = {...this.todo.share[id]};
        const [status, msgId] = share.status.split('.');
        if (msgId) {
          share.status = `recall.${msgId}`;
          this.todo.share[id] = share;
        } else {
          // just add for invited, not saved in db yet -> ok to set to null
          this.todo.share[id] = null;
        }
      } else {
        // user has accepted and now be unshare
        const share = {...this.todo.share[id]};
        share.status = 'unshared';
        this.todo.share[id] = share;
      }  
      this.props.updateCurrentTodo(this.todo);
    }   
  }

  hideToolbar() {
    this.setState({ hideToolbar : true });
  }

  showToolbar() {
    this.setState({ hideToolbar : false });
  }

}

/* Container */

const mapStateToProps = state => {  
  // special process for group
  // if currentTodo is initial loaded, store the origin group as we need it to
  // further process such as remove todo from group...
  // with initial loadfed, group should be a string, I will format it to an 
  // object with original group
  const currentTodo = {...state.currentTodo};
  if (currentTodo.group && typeof currentTodo.group === 'string') {
    currentTodo.group = { origin : currentTodo.group };
  }
  return { 
    auth : state.user.auth,
    friends : state.user.friends,
    currentTodo,
    taskGroup: state.taskGroup,
    filter : state.filter,
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
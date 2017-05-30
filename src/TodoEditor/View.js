"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon} from 'react-onsenui'

import ons from 'onsenui'

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

  componentDidMount() {
    /* record the origin group to resolve later */
    if (this.props.currentTodo & Object.keys(this.props.currentTodo).length > 0) {    
      const id =  this.props.currentTodo.group? this.props.currentTodo.group.origin : '_0_';
      const share = {};
      for (let userId in this.props.currentTodo.share) {
        const member = {...this.props.currentTodo.share[userId]};
        share[userId] = member;
      }
      this.originGroup = {id, share};
    }
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
      const group = { origin: '_0_', updated : '_0_' };

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
    } else {
      this.todo.dueDate = '';
    }
  }

  getTaskGroup(group) {
    if (!group) { 
      return; 
    }

    if (!this.todo.group) {
      this.todo.group = {};
    }
    

    // load members in the group and merge with current list if group is not none
    // merge only if member is already invited or accepted
    // change: replace all members of old group by the new one. if no group, 
    // simply empty share list

    /* solution
       record an original share list (when component did mount)
       when change to new group, simple load members based on new group
       we resolve the share list later when save action take place
    */
    if (group.id) {
      /* reload share members if old group is selected */
      if (this.originGroup && group.id === this.originGroup.id) {      
        this.todo.share = this.originGroup.share;
      } else {     
        const share = {};
        // init share list with owner
        share[this.props.auth.uid] = {
          id: this.props.auth.uid,
          name : this.props.auth.email,
          role: 'owner',
          status: 'accepted'
        }; 
        // add all members of the group into share list
        if (group.id !== '_0_') {        
          for (let id in this.props.taskGroup[group.id].members) {
            if (id === this.props.auth.uid) { continue }
            const member = this.props.taskGroup[group.id].members[id];                    
            share[id] = {...member};
            share[id].role = 'collaborator';
          }
          this.todo.share = share;
        } else {
          if (this.todo.group.updated & this.todo.group.updated !== '_0_' ) {
            this.todo.share = share;
          }
        }    
        
      }

    }
    
    this.todo.group.updated = group.id;

    this.props.updateCurrentTodo(this.todo);
  }

  addTodo() {
    
    if (this.todo.text.length === 0) { 
      ons.notification.alert('Please fill in todo text');
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
      ons.notification.alert('Please fill in todo text');
      return;
    }

    /* need to resole the origin group with the new group here */
    if (this.originGroup && this.todo.group) {
      if (this.todo.group.updated && this.todo.group.updated !== this.originGroup.id) {
        /* resolve 
           for each member in origin list
              accept        -> unshared
              invited.msgId -> recall.msgId
              invited       -> null
           for each member is new list, if conflic 
              new status - old status   : resolve
              ------------------------------------
              accepted   - unshared     : accepted              
              accepted   - recall.msgId : accepted*recall.msgId
              invited    - unshare      : invited*unshare (unshare to send message, invited to keep member in share list )
              invited    - recall.msgId : invited*recall.msgId
          if no conflic
              unshared
              recall.msgId
        */
        const share = {};

        for (let id in this.originGroup.share) {
          const member = {...this.originGroup.share[id]};
          if (id !== this.props.auth.uid) {
            if (/accepted/.test(member.status)) {
              member.status = 'unshared';
            }
            if (/invited/.test(member.status)) {
              const [status, msgId] = member.status.split('.');
              if (msgId) {
                member.status = `recall.${msgId}`;
              } else {
                member.status = null;
              }
            }
          }
          if (member.status !== null) {
            share[id] = member;
          }
       
        }

        for (let id in this.todo.share) {
          if (id === this.props.auth.uid) { continue }
          const member = {...this.todo.share[id]};
          if (share[id]) {
            if (/accepted/.test(member.status) && /recall/.test(share[id].status)) {
              member.status = `accepted*${share[id].status}`;
            }
            if (/invited/.test(member.status)) {
              member.status = `invited*${share[id].status}`;
            }
          }
          member.role = 'collaborator';
          share[id] = member;
        }
        this.todo.share = share;
      }
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
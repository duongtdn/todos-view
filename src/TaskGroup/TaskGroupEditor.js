"use strict"

import React , { Component } from 'react'
import { Page, List, ListHeader, ListItem, Icon, Input,
         Toolbar, ToolbarButton, BackButton,
         Col, Row, Button } from 'react-onsenui'

import { connect } from 'react-redux'
import { taskGroup } from 'todos-data'

import CollaboratorList from '../TodoEditor/CollaboratorList'

class View extends Component {
  constructor(props) {
    super (props);

    this.state = {
      name : '',
      members : []
    };

    this.renderToolbar = this.renderToolbar.bind(this);
    this.createNewTaskGroup = this.createNewTaskGroup.bind(this);
    this.inviteFriends = this.inviteFriends.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this._getMembers = this._getMembers.bind(this);
    this.unshare = this.unshare.bind(this);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
        <div className = 'center'>
          Task Group
        </div>
        <div className = 'right'>
          <ToolbarButton ripple = {true} modifier = 'quiet' onClick = {this.createNewTaskGroup} > 
              Add 
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  render() {
    const share = this._getMembers(this.state.members);
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <List >
          
          <ListHeader modifier = 'nodivider'> New Task Group </ListHeader>

          <ListItem modifier = 'nodivider'>
            <div className = 'fe-title'> Name </div>
            <Input className = 'fe-input' 
                   value ={this.state.name} 
                   onChange = {e => this.getName(e.target.value)} />
          </ListItem>

          <ListHeader> Members </ListHeader>

          <div style = {{width : '100%'}}>
            <Button modifier = 'quiet' 
                    onClick = {() => this.inviteFriends()}
            > 
              <Icon icon = 'fa-user-plus' /> Invite People 
            </Button>
          </div>

          <div style = {{width : '100%'}} >
            <CollaboratorList data = {share} unshare = {this.unshare} />
          </div>

        </List>
      </Page>
    );
  }

  createNewTaskGroup() {
    const members = [];
    for (let uid in this.state.members) {
      if (this.state.members[uid]) {
        members.push(uid);
      }
    }
    this.props.createTaskGroup({ 
      name : this.state.name, 
      members : members,
      color : 'grey'
    });
    this.props.popPage();
  }

  getName(name) {
    this.setState({ name });
  }

  inviteFriends() {
    const share = this.state.members;
    this.props.pushPage('friends', {share, get : this.getMembers})
  }

  getMembers(members) {
    this.setState({ members });
  }

  _getMembers(lst) {
    const share = [];
    for (let uid in lst) {
      if (lst[uid] !== null) {
        const sharedUser = lst[uid];
        if (/recall/i.test(sharedUser.status) || sharedUser.status === 'unshared') {
          continue;
        }
        if (uid === this.props.auth.uid) {
          share.push({ 
            id : uid,
            name : 'Me', 
            role : sharedUser.role,
            relationship : sharedUser.role === 'owner' ? 'Task Group Owner' : sharedUser.role
          });
        } else {
          const label = (/invited/i).test(sharedUser.status) ? ', Inviting' : '';
          if (this.props.friends && this.props.friends[uid]) {
            share.push({
              id : uid,
              name : this.props.friends[uid].name,
              role : sharedUser.role,
              relationship : `${this.props.friends[uid].relationship}${label}`
            });
          } else {
            share.push({
              id : uid,
              name : sharedUser.name,
              role : sharedUser.role,
              relationship : `Not connected${label}`
            });
          }
        }
      }
    }
    return share;
  }

  unshare(id) {
    const members = {...this.state.members};
    if (members[id]) {
      if (members[id].role === 'owner') { return; }
      if ((/invited/i).test(members[id].status)) {
        const [status, msgId] = members[id].status.split('.');
        if (msgId) {
          members[id].status = `recall.${msgId}`;
        } else {
          // just add for invited, not saved in db yet -> ok to set to null
          members[id] = null;
        }
      } else {
        // user has accepted and now be unshare
        members[id].status = 'unshared';
      }  
    }   
    this.setState({ members });
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    auth : state.user.auth,
    friends : state.user.friends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTaskGroup(group) {
      dispatch(taskGroup.create(group));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(View)
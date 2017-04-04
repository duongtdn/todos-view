"use strict"

import React , { Component } from 'react'
import { Page, List, ListHeader, ListItem, Icon, Input,
         Toolbar, ToolbarButton, BackButton,
         Col, Row, Button } from 'react-onsenui'
import ons from 'onsenui'
import { connect } from 'react-redux'
import { taskGroup } from 'todos-data'

class View extends Component {
  constructor(props) {
    super (props);

    this.state = {
      selectedTaskGroup : {id : null}
    };

    this._findTaskGroupOwner = this._findTaskGroupOwner.bind(this);
    this._findOwnerName = this._findOwnerName.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.getSelectedTaskGroup = this.getSelectedTaskGroup.bind(this);
  }

  componentWillMount() {
    this.getSelectedTaskGroup(this.props);
  }

  componentWillReceiveProps(nextProps) {
    
  }

  getSelectedTaskGroup(props) {
    if (this.props.data && this.props.data.selected) {
      const selectedTaskGroup = {...this.props.data.selected};
      selectedTaskGroup.id = selectedTaskGroup.updated || selectedTaskGroup.origin;
      this.setState({ selectedTaskGroup });
    }
  }

  renderToolbar() {
    return (
       <Toolbar>
        <div className = 'left'>
          <BackButton onClick = {() => this.done()}> 
            Back
          </BackButton  >
        </div>
        <div className = 'center'>
          Task Groups
        </div>
      </Toolbar>
    );
  }

  render() {
    const taskGroups = this.props.taskGroups;
    return (
      <Page renderToolbar = {this.renderToolbar} >

        <List>
          <ListHeader> Your Task Groups </ListHeader>

          {taskGroups.map(group => {
            let detail = null;
            let deleteBtn = null;

            const selectBtn = (
              <label className = 'left' >
                <Input type = 'radio' inputId = {`radio-${group.id}`} 
                        checked = {group.id === this.state.selectedTaskGroup.id}
                        onChange={this.handleSelectionChange.bind(this, group)} /> 
              </label>
            );

            if (!this.props.data || !this.props.data.get) {
              deleteBtn = (
                <label className = 'right'>
                  <Button modifier = 'quiet' onClick = {() => this.showAlertDialog(group)} > 
                    <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/> 
                  </Button>
                </label>
              );
            }

            if (group.id === '_0_') {
              if (!this.props.data || !this.props.data.get) {
                return;
              }
              /* only show None in selection mode */
              detail = (
                <label className = 'center' htmlFor={`radio-${group.id}`}>
                  <div className = 'todo-editor-collaborate-name' > None </div>
                  <div className = 'todo-editor-collaborate-relationship'> Don't assign to any Task group' </div>
                </label>
              );   
            } else {
              const owner = this._findTaskGroupOwner(group);
              detail = (
                <label className = 'center' htmlFor={`radio-${group.id}`}>
                  <div className = 'todo-editor-collaborate-name' > {group.name} </div>
                  <div className = 'todo-editor-collaborate-relationship'> Created by {owner} </div>
                  <div className = 'todo-editor-collaborate-relationship'> Members: {Object.keys(group.members).length} </div>
                </label>
              );
            }
                
            return (
              <ListItem key = {group.id} >
                {selectBtn}
                {detail}
                {deleteBtn}
              </ListItem>
            )   
          })}

        </List>

      </Page>
    )
  }

  handleSelectionChange(group) {
    this.setState({ selectedTaskGroup : group});
  }

  done() {
    if (this.props.data && this.props.data.get) {
      this.props.data.get(this.state.selectedTaskGroup);
    }
    this.props.popPage();
  }

  showAlertDialog(group) {
    ons.notification.confirm({
      message: `Do you want to remove Task group ${group.name} from your list?`,
      callback : ans => { 
        if (ans === 1) { 
          console.log(group)
          this.props.delete(group)
          .then(() => console.log('success'))
          .catch(err => console.log(err));
        }
      }
    });
  }

  _findTaskGroupOwner(group) {
    const members = group.members;
    for (let uid in members) {
      if (members[uid].role === 'owner') {
        return this._findOwnerName(uid);
      }
    }
  }

  _findOwnerName(uid) {
    if (uid === this.props.auth.uid) {
      return 'Me';
    } else {
      return (this.props.friends[uid] && this.props.friends[uid].name) || 'Unknown';
    }
  }

}

/* Container */

const mapStateToProps = state => {  
  const groups = [];
  groups.push({
    id : '_0_',
  });
  for (let key in state.taskGroup) {
    groups.push({...state.taskGroup[key]});
  }
  return { 
    auth : state.user.auth,
    friends : state.user.friends,
    taskGroups : groups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete(group) {
      return dispatch(taskGroup.delete(group));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(View)
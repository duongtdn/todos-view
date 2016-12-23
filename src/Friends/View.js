"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, BottomToolbar, Row, Col } from 'react-onsenui'

import { connect } from 'react-redux'
import { currentTodo } from 'todos-data'

import Toolbar from './Toolbar'

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  renderRow(row) {
    return (
      <ListItem key = {row.id} modifier = 'nodivider' >
        <label className = 'left'> 
          <Input type = 'checkbox' inputId = {`checkbox-${row.id}`} 
                 onChange = {evt => this.selectFriend(row.id, evt)}
                 checked = {this.isSelected(row.id)} />
        </label>
        <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
          <Col>
            <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
            <Row className = 'todo-editor-collaborate-relationship'> {row.relationship} </Row>
            <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
          </Col>
        </label>
        <label className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </label>
      </ListItem>
    );
  }

  renderHeader() {
    return (
      <ListHeader> {this.props.category} </ListHeader>
    );
  }

  render() {
    return (
      <List dataSource = {this.props.data} 
            renderRow = {this.renderRow}
            renderHeader = {this.renderHeader}
            modifier = 'noborder'
      />
    );
  }

  selectFriend(id, evt) {
    const checked = evt.target.checked;
    this.props.selectFriend(id, checked);
  }

  isSelected(id) {
    return (this.props.selectedFriends[id] && this.props.selectedFriends[id] !== null);
  }

}

class FriendsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends : [],
      selectedFriends : {}
    };

    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
    this.cancel = this.cancel.bind(this);
    this.addFriends = this.addFriends.bind(this);
  }

  componentWillMount() {
    const friends = [];
    const selectedFriends = {...this.props.data.share};
    for ( let uid in this.props.friends) {
      friends.push({...this.props.friends[uid]});
    }
    this.setState({ friends, selectedFriends });
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} pushPage = {this.props.pushPage} title = 'Collaborators' />
    );
  }

  renderBottomToolbar() {
    return (
      <BottomToolbar>

          <Row style = {{height : '100%'}} >
            <Col verticalAlign = 'center'> 
              <Button modifier = 'quiet' 
                      style = {{textAlign: 'center', width: '100%'}}
                      onClick = {this.cancel} > 
                Cancel
              </Button> 
            </Col>
            <Col verticalAlign = 'center'> 
              <Button modifier = 'quiet' 
                      style = {{textAlign: 'center', width: '100%'}}
                      onClick = {this.addFriends} > 
                Done
              </Button> 
            </Col>
          </Row>

      </BottomToolbar>
    );       
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar}
            renderBottomToolbar = {this.renderBottomToolbar}
      >
        <FriendsList category = 'Friends' 
                     data = {this.state.friends}
                     selectedFriends = {this.state.selectedFriends} 
                     selectFriend = {this.selectFriend} />
      </Page>
    );
  }

  selectFriend(id, checked) {
    const selectedFriends = {...this.state.selectedFriends};
    if (checked) {
      selectedFriends[id] = 'invited';
    } else {
      selectedFriends[id] = null;
    }
    this.setState({ selectedFriends });
  }

  cancel() {
    this.props.popPage();
  }

  addFriends() {
    const currentTodo = {...this.props.data};
    currentTodo.share = this.state.selectedFriends;
    this.props.updateCurrentTodo(currentTodo);
    this.props.popPage();
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    friends : state.user.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentTodo(todo) {
      dispatch(currentTodo.update(todo));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FriendsView)
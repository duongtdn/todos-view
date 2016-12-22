"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, BottomToolbar, Row, Col } from 'react-onsenui'

import { connect } from 'react-redux'
import { currentTodo } from 'todos-data'

import Toolbar from './Toolbar'

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFriends : {}
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  componentWillMount() {
    this.setState({ 
      selectedFriends : this.props.currentTodo.share
    });
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
    const selectedFriends = {...this.state.selectedFriends};
    if (evt.target.checked) {
      selectedFriends[id] = 'invited';
    } else {
      selectedFriends[id] = null;
    }
    console.log (selectedFriends);
    this.setState({ selectedFriends });
  }

  isSelected(id) {
    return (this.state.selectedFriends[id] && this.state.selectedFriends[id] !== null);
  }

}

class FriendsView extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
  }

  componentWillMount() {
    const friends = [];
    for ( let uid in this.props.friends) {
      friends.push(this.props.friends[uid]);
    }
    this.setState({ friends });
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
              <Button modifier = 'quiet' style = {{textAlign: 'center', width: '100%'}}> Cancel </Button> 
            </Col>
            <Col verticalAlign = 'center'> 
              <Button modifier = 'quiet' style = {{textAlign: 'center', width: '100%'}}> Done </Button> 
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
                     currentTodo = {this.props.data} />
      </Page>
    );
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
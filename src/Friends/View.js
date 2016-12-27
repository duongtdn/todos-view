"use strict"

import React , { Component } from 'react'
import { Page, Input, Button, Icon, BottomToolbar, Row, Col } from 'react-onsenui'

import { connect } from 'react-redux'
import { currentTodo, search, user } from 'todos-data'

import Toolbar from './Toolbar'
import FriendsList from './FriendsList'

class FriendsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result : [],
      friends : [],
      selectedFriends : {}
    };

    this.searchInput = '';

    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
    this.selectFriend = this.selectFriend.bind(this);
    this.cancel = this.cancel.bind(this);
    this.addToShareList = this.addToShareList.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.addAndSelectFriend = this.addAndSelectFriend.bind(this);
  }

  componentWillMount() {
    const friends = [];
    const selectedFriends = {...this.props.data.share};
    for ( let uid in this.props.friends) {
      const user = {...this.props.friends[uid]};
      user.connected = true;
      friends.push(user);
    }
    this.setState({ friends, selectedFriends });
  }

  componentWillReceiveProps(nextProps) {    
    const result = [];
    if (nextProps.search) {
      const user = {...nextProps.search};
      user.connected = false;
      user.relationship = '';
      result.push(user);
      this.setState({ result });
    }
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} 
               pushPage = {this.props.pushPage} 
               handleSearchInput = {this.handleSearchInput} 
               handleKeyUp = {this.handleKeyUp} />
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
                      onClick = {this.addToShareList} > 
                Done
              </Button> 
            </Col>
          </Row>

      </BottomToolbar>
    );       
  }

  render() {
    const data = this.searchInput.length > 0 ? this.state.result : this.state.friends;
    return (
      <Page renderToolbar = {this.renderToolbar}
            renderBottomToolbar = {this.renderBottomToolbar}
      >
        <FriendsList category = 'Friends' 
                     data = {data}
                     selectedFriends = {this.state.selectedFriends} 
                     selectFriend = {this.selectFriend} 
                     addAndSelectFriend = {this.addAndSelectFriend} />
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

  addToShareList() {
    const currentTodo = {...this.props.data};
    currentTodo.share = this.state.selectedFriends;
    this.props.updateCurrentTodo(currentTodo);
    this.props.popPage();
  }

  handleSearchInput(text) {
    this.searchInput = text;
    const result = this.state.friends.filter(user => {
      const pattern = new RegExp(text.toUpperCase());
      const email = user.email.toUpperCase();
      const name = user.name.toUpperCase();
      return (text.length === 0) || (pattern.test(name) || pattern.test(email));
    });
    this.setState({ result });       
  }

  handleKeyUp(code) {
    if (code === 13) { // enter key
      if (this.state.result.length === 0) {
        this.props.searchByEmail(this.searchInput);
      }
    }
  }

  addAndSelectFriend(usr) {
    // add this user to friend list
    this.props.addToFriendList(usr);
    // then, select this user and add to todo share list
    const currentTodo = {...this.props.data};
    currentTodo.share[usr.id] = 'invited';
    this.props.updateCurrentTodo(currentTodo);
    this.props.popPage();
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    friends : state.user.friends,
    search : state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentTodo(todo) {
      dispatch(currentTodo.update(todo));
    },
    searchByEmail(email) {
      dispatch(search.apply(email));
    },
    addToFriendList(usr) {
      const friend = {...usr};
      friend.connected = null;
      dispatch(user.friends.add([friend]));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FriendsView)
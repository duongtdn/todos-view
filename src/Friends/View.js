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

    const selectedFriends = this.props.data && this.props.data.share ?
                 {...this.props.data.share} :
                 {};

    const friends = this.getFriendsFromProps(this.props);

    this.setState({ friends, selectedFriends });
  }

  componentWillReceiveProps(nextProps) {    
    const result = [];
    if (nextProps.search) {
      const user = {...nextProps.search};
      user.connected = false;
      user.relationship = '';
      result.push(user);
    }

    const friends = this.getFriendsFromProps(nextProps);

    this.setState({ result,  friends });
  }

  getFriendsFromProps(props) {
    const friends = [];
    for ( let uid in props.friends) {
      const user = {...props.friends[uid]};
      user.connected = true;
      friends.push(user);
    }
    return friends;
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
                     addAndSelectFriend = {this.addAndSelectFriend} 
                     unfriend = {this.props.unfriend}
                     platform = {this.props.platform} />
      </Page>
    );
  }

  selectFriend(usr, checked) {
    const selectedFriends = {...this.state.selectedFriends};
    if (checked) {
      selectedFriends[usr.id] = {
        id : usr.id,
        name : usr.name,
        role : 'collaborator',
        status : 'invited'
      };
    } else {
      selectedFriends[usr.id] = null;
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

  handleKeyUp(code, text) {
    this.searchInput = text; 
    if (code === 13) { // enter key
      if (this.state.result.length === 0) {
        this.props.searchByEmail(this.searchInput);
      }
    }
  }

  addAndSelectFriend(usr) {
    // add this user to friend list
    this.props.addToFriendList(usr);
    // then, select this user and add to todo share list if there's a todo, i.e.
    // page is open from todo editor, otherwise just show friends list
    if (this.props.data) {
      const currentTodo = {...this.props.data};
      currentTodo.share[usr.id] = {
        id : usr.id,
        name : usr.name,
        role : 'collaborator',
        status : 'invited'
      };
      this.props.updateCurrentTodo(currentTodo);
      this.props.popPage();
    } else {
      this.searchInput = '';
      const result = [];
      this.setState({ result });  
    }
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
      dispatch(search.apply('email', email));
    },
    addToFriendList(usr) {
      const friend = {...usr};
      friend.connected = null;
      dispatch(user.friends.add([friend]));
    },
    unfriend(id) {
      dispatch(user.friends.remove(id));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FriendsView)
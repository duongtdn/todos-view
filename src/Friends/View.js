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
      searchingDatabase : false,
      matchedSearch : true,
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
      if (nextProps.search.length > 0) {
        nextProps.search.forEach(user => {
          user.connected = false;
          user.relationship = '';
          result.push(user);
        });
        this.setState({matchedSearch : true, searchingDatabase : false});
      } else if (this.searchInput.length > 0) {
        this.setState({matchedSearch : false, searchingDatabase : false});
      } 
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
               handleKeyUp = {this.handleKeyUp}
               addToShareList = {this.addToShareList}
               popPage = {this.props.popPage} />
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
                     searchingDatabase = {this.state.searchingDatabase}
                     matchedSearch = {this.state.matchedSearch}
                     data = {data}
                     selectedFriends = {this.state.selectedFriends} 
                     selectFriend = {this.selectFriend} 
                     addAndSelectFriend = {this.addAndSelectFriend} 
                     unfriend = {this.props.unfriend}
                     platform = {this.props.platform}
                     auth = {this.props.auth}
                     pushPage = {this.props.pushPage} />
        
        <div className = 'dummy-btn' >
          <button id = 'dummy' />
        </div>

      </Page>
    );
  }

  selectFriend(usr, checked) {
    const selectedFriends = {...this.state.selectedFriends};
    if (checked) {
      let status = 'invited';
      if (selectedFriends[usr.id] && (/recall/i).test(selectedFriends[usr.id].status)) {
        const [s, msgId] = selectedFriends[usr.id].status.split('.');
        status = `invited.${msgId}`;
      }
      if (selectedFriends[usr.id] && selectedFriends[usr.id].status === 'unshared') {
        const [s, msgId] = selectedFriends[usr.id].status.split('.');
        status = `accepted`;
      }
      selectedFriends[usr.id] = {
        id : usr.id,
        name : usr.name,
        role : 'collaborator',
        status : status
      };
    } else {
      if (selectedFriends[usr.id] && (/invited/i).test(selectedFriends[usr.id].status)) {
        const share = {...selectedFriends[usr.id]};
        const [status, msgId] = share.status.split('.');
        if (msgId) {
          share.status = `recall.${msgId}`;
          selectedFriends[usr.id] = share;
        } else {
          // just add for invited, not saved in db yet -> ok to set to null
          selectedFriends[usr.id] = null;
        }
      } else {
        // user has accepted and now be unshare
        const share = {...selectedFriends[usr.id]};
        share.status = 'unshared';
        selectedFriends[usr.id] = share;
      }
    }
    this.setState({ selectedFriends });
  }

  cancel() {
    this.props.popPage();
  }

  addToShareList() {
    if (this.props.data) {
      const currentTodo = {...this.props.data};
      currentTodo.share = this.state.selectedFriends;
      this.props.updateCurrentTodo(currentTodo);
    }
    this.props.popPage();
  }

  handleSearchInput(text) {
    this.searchInput = text;
    const result = this.state.friends.filter(user => {
      const pattern = new RegExp(text.toLowerCase());
      const email = user.email.toLowerCase();
      const name = user.name.toLowerCase();
      return (text.length === 0) || (pattern.test(name) || pattern.test(email));
    });
    if (result.length > 0) {
      this.setState({ result, matchedSearch : true }); // explicitly specify matched
    } else {
      this.setState({ result }); // since no match is only show up for search DB, don't specify it here for local search
    }   
    return result; 
  }

  handleKeyUp(code, text) {
    this.searchInput = text; 
    if (code === 13) { // enter key
      if (text === '') {
        // blur from input box by focus to a dummy element
        document.getElementById('dummy').focus();
        return;
      }
      const result = this.handleSearchInput(text); // make sure that local search is done first
                                                   // since this event is invoked before react update state.result from handleSearchInput
      if (result.length === 0) { // not found from local, search DB
        this.props.searchByEmail(this.searchInput.toLowerCase().replace(/ +/g,''));
        this.setState({ searchingDatabase : true});        
      }
      // blur from input box by focus to a dummy element
      document.getElementById('dummy').focus();
    }
  }

  addAndSelectFriend(usr) {
    // add this user to friend list
    this.props.addToFriendList(usr);
    // then, select this user and add to todo share list if there's a todo, i.e.
    // page is open from todo editor, otherwise just show friends list
    this.searchInput = '';
    const result = [];
    if (this.props.data) {
      const selectedFriends = {...this.state.selectedFriends};
      selectedFriends[usr.id] = {
        id : usr.id,
        name : usr.name,
        role : 'collaborator',
        status : 'invited'
      };
      this.setState({ selectedFriends, result });
    } else {
      this.setState({ result });  
    }
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 
    friends : state.user.friends,
    search : state.search,
    auth : state.user.auth
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
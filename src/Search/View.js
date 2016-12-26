"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Button, Icon} from 'react-onsenui'

import { connect } from 'react-redux'
import { search, user } from 'todos-data'

import Toolbar from './Toolbar'
import ResultList from './ResultList'

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = { result : [], selectedFriends : {} };

    this.friendsList = [];
    this.searchInput = '';

    this.renderToolbar = this.renderToolbar.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    for (let uid in this.props.friends) {
      const user = {...this.props.friends[uid]};
      user.connected = true;
      this.friendsList.push(user);
    }
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
      <Toolbar platform = {this.props.platform} title = 'Search' 
               handleSearchInput = {this.handleSearchInput} 
               handleKeyUp = {this.handleKeyUp} />
    );
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <ResultList category = 'Result' 
                     data = {this.state.result}
                     addFriend = {this.props.addFriend} 
                     popPage = {this.props.popPage} />
      </Page>
    );
  }

  handleSearchInput(text) {
    this.searchInput = text;
    const result = this.friendsList.filter(user => {
      const pattern = new RegExp(text.toUpperCase());
      const email = user.email.toUpperCase();
      const name = user.name.toUpperCase();
      return (text.length > 0) && (pattern.test(name) || pattern.test(email));
    });
    this.setState({ result });       
  }

  handleKeyUp(code) {
    if (code === 13) { // enter key
      if (this.state.result.length === 0) {
        console.log('not found in connected list, search over network')
        this.props.searchByEmail(this.searchInput);
      }
    }
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
    searchByEmail(email) {
      dispatch(search.apply(email));
    },
    addFriend(usr) {
      const friend = {...usr};
      friend.connected = null;
      console.log(friend);
      dispatch(user.friends.add([friend]));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SearchView)
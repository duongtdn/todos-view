"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Button, Icon} from 'react-onsenui'

import { connect } from 'react-redux'

import Toolbar from './Toolbar'
import FriendsList from '../Friends/FriendsList'

class ResultList extends Component {
  constructor(props) {
    super(props);

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
}

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = { result : [], selectedFriends : {} };

    this.friendsList = [];

    this.renderToolbar = this.renderToolbar.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    for (let uid in this.props.friends) {
      this.friendsList.push(this.props.friends[uid]);
    }
  }

  renderToolbar() {
    return (
      <Toolbar platform = {this.props.platform} title = 'Search' 
               handleSearchInput = {this.handleSearchInput} />
    );
  }

  render() {
    console.log(this.props.friends)
    return (
      <Page renderToolbar = {this.renderToolbar} >
        <FriendsList category = 'Result' 
                     data = {this.state.result}
                     selectedFriends = {this.state.selectedFriends} 
                     selectFriend = {this.selectFriend} />
      </Page>
    );
  }

  handleSearchInput(text) {
    const result = this.friendsList.filter(user => {
      const pattern = new RegExp(text.toUpperCase());
      const email = user.email.toUpperCase();
      const name = user.name.toUpperCase();
      return (text.length > 0) && (pattern.test(name) || pattern.test(email));
    });
    this.setState({ result });
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
    
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SearchView)
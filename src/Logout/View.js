"use strict"

import React , { Component } from 'react'

import { Page, Icon } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

class Logout extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.signOut();
    },1000);
  }

  render() {
    return (
      <Page>
        <div className = 'sync-info' >
            <div>
              <h3 className = 'center' > SIGNING OUT </h3>
            </div>
            <div>
              <Icon icon = 'md-spinner' size ={48} spin />
            </div>
          </div>
      </Page>
    );
  }

  signOut() {
    this.props.signOut().then(() => {
      this.props.resetPage('login');
    });
    
  }

}

/* Container */

const mapStateToProps = state => {  
  return { 

  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      return dispatch(user.signOut());
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Logout)
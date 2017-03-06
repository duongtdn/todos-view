"use strict"

import React , { Component } from 'react'

import { Page, Icon } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import ad from '../ad'

class Logout extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.signOut();
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
    const resetToLogin = () => {
      this.props.resetPage('login').catch(err => {
        setTimeout(() => resetToLogin(), 100);
      });
    }
    this.props.signOut().then(() => {
      ad.hideBanner();
      resetToLogin();
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
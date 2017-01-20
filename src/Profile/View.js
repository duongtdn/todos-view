"use strict"

import React , { Component } from 'react'

import { Page } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

import Profile from './Profile'


/* Container */

const mapStateToProps = state => {  
  return { 
    user : state.user.auth,
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
)(Profile)
"use strict"

import React , { Component } from 'react'
import { Page, Toolbar, BackButton, ToolbarButton, List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui'
import { connect } from 'react-redux'

class FriendEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : '',
      email : '',
      rel : '',
      selectedRel : '',
      showOtherRelInput : 'none'
    };

    this.predefinedRels = ['Family Member', 'Friend', 'Colleague', 'Other'];

    this.renderToolbar = this.renderToolbar.bind(this);
    this.saveFriend = this.saveFriend.bind(this);

  }

  componentDidMount() {
    let rel = '';
    let selectedRel = '';
    let showOtherRelInput = 'none';
    if (this.props.data.rel) {
      rel = this.props.data.rel;
      if (this.predefinedRels.indexOf(this.props.data.rel) === -1) {
        selectedRel = 'Other';
        showOtherRelInput = 'block';
      } else {
        selectedRel = rel;
        showOtherRelInput = 'none';
      }
    }
    this.setState({ 
      name: this.props.data.name, 
      email: this.props.data.email, 
      selectedRel, rel, showOtherRelInput 
    });
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
        <div className = 'center'>
          Contact
        </div>
        <div className = 'right'>
          <ToolbarButton ripple = {true} modifier = 'quiet' onClick = {this.saveFriend} > 
              Save 
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  render() {
    return(
      <Page renderToolbar = {this.renderToolbar} >
        <List>
          
          <ListHeader modifier = 'nodivider'> Contact Information </ListHeader>

          <ListItem modifier = 'nodivider'>
            <div className = 'fe-title'> Name </div>
            <Input className = 'fe-input' 
                   value ={this.state.name} 
                   onChange = {e => this.getName(e.target.value)} /> 
          </ListItem>

          <ListItem modifier = 'nodivider'>
            <div className = 'fe-title'> Email </div>
            <Input className = 'fe-input' 
                   value ={this.state.email} 
                   onChange = {e => this.getEmail(e.target.value)} />
          </ListItem>

          
          <ListHeader modifier = 'nodivider'> Relationship </ListHeader>

          {this.predefinedRels.map(rel => (
            <ListItem key = {rel} modifier = 'nodivider' tappable>
              <label style = {{minWidth : '35px'}} >
                <Input inputId = {`radio-${rel}`}
                      type = 'radio' 
                      checked = {rel === this.state.selectedRel}
                      onChange = {() => this.getRel(rel)} />
              </label>
              <label htmlFor = {`radio-${rel}`} className = 'center'>
                {rel}
              </label>
            </ListItem>
          ))}

          <ListItem style = {{display: this.state.showOtherRelInput}} >
             <Input   className = 'fe-input'
                      onChange = {e => this.handleRelInput(e.target.value)} 
                      value = {this.state.rel}
                      style = {{display: this.state.showOtherRelInput}}   />
          </ListItem>

        </List>
      </Page>
    );
  }

  getName(name) {
    this.setState({ name });
  }

  getEmail(email) {
    this.setState({ email });
  }

  getRel(rel) {
    if (rel === 'Other') {
      this.setState({ rel, selectedRel : rel, showOtherRelInput : 'block' });
    } else {
      this.setState({ rel, selectedRel : rel, showOtherRelInput : 'none' });
    }
  }

  handleRelInput(rel) {
    if (this.state.selectedRel === 'Other') {
        this.setState({ rel });
      } 
  }

  saveFriend() {
    this.props.data.save(this.state.name, this.state.rel);
    this.props.popPage();
  }


}

/* Container */

const mapStateToProps = state => {  
  return { 
    auth : state.user.auth,
    friends : state.user.friends,
    currentTodo : state.currentTodo 
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FriendEditor)
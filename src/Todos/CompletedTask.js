"use strict"

import React , { Component } from 'react'
import {ListItem, Icon, Input, Col, Row, Button} from 'react-onsenui'

function formatDate(timestamp) {
  const ts = parseInt(timestamp);
  const months = ['Jan', ' Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Dec', 'Oct', 'Nov', 'Dec'];
  const d = new Date(ts);
  const date = d.getDate();
  const month = months[d.getMonth()];
  return `${date} - ${month}`;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation : '',
      isChecked : true
    };    
  }

  render() {
    
    const data = this.props.data;

    let completedBy = 'completed';
    if (data.completedBy === this.props.auth.uid) {
      completedBy = 'by Me';
    }
    if (this.props.friends && this.props.friends[data.completedBy]) {
      completedBy = `by ${this.props.friends[data.completedBy].name}`;
    }

    const urgentStyle = data.urgent ? 'todos-urgent' : '';

    return (
      <ListItem className = {`${this.state.animation} ${urgentStyle}`} key = {data.id} >
        <div className = 'left'> 
          <Input type = 'checkbox' checked = {this.state.isChecked} onChange = {() => this.undoComplete(data)} />
        </div>

        <div className = 'center' onClick = {() => this.toggleInfoMenu(data)}>
          <div className = 'todos-text'>
            {data.text}
          </div>
          <div className = 'todos-ext'>
            {completedBy} at {formatDate(data.completedAt)}
          </div>
        </div>

        <div className = 'right'>
          <Button modifier = 'quiet' onClick = {() => this.deleteTodo(data)} > 
            <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/> 
          </Button>
        </div>
      </ListItem>
    );
  }

  toggleInfoMenu() {
    // implement later
  }

  undoComplete(todo) {

    this.setState({ animation : 'animation-swipe-left hide-children', isChecked : false });

    setTimeout(() => {
      this.props.undoComplete(todo);
    }, 950);

  }

  deleteTodo(todo) {

    this.setState({ animation : 'animation-remove hide-children' });

     setTimeout(() => {
      this.props.deleteTodo(todo);
    }, 750);

  }

}
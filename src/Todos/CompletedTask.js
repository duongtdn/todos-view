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
    const bgHighlight = data.urgent ? 'todos-highlight' : '';
    return (
      <ListItem className = {`${this.state.animation} ${bgHighlight}`} key = {data.id} >
        <div className = 'left'> 
          <Input type = 'checkbox' checked = {this.state.isChecked} onChange = {() => this.undoComplete(data)} />
        </div>

        <div className = 'center' onClick = {() => this.toggleInfoMenu(data)}>
          <div className = 'todos-text'>
            {data.text}
          </div>
          <div className = 'todos-ext'>
            completed at {formatDate(data.completedAt)}
          </div>
        </div>

        <div className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
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

}
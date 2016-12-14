"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

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
    
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row, index) {
    return (
      <ListItem key = {index} >
        <div className = 'left'> 
          <Input type = 'checkbox' checked = {true} />
        </div>

        <div className = 'center' onClick = {() => this.toggleInfoMenu(index)}>
          <div className = 'todos-text'>
            {row.text}
          </div>
          <div className = 'todos-ext'>
            completed at {formatDate(row.completedAt)}
          </div>
        </div>

        <div className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </div>
      </ListItem>
    );
  }

  render() {
    return (
      <Page>
        <List
          dataSource = {this.props.todos}
          renderRow = {this.renderRow}
        />
      </Page>
    );
  }

  toggleInfoMenu() {

  }

}
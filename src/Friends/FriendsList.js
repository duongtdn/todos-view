"use strict"

import React , { Component } from 'react'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, Row, Col } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  renderRow(row) {
    return (
      <ListItem key = {row.id} modifier = 'nodivider' >
        <label className = 'left'> 
          <Input type = 'checkbox' inputId = {`checkbox-${row.id}`} 
                 onChange = {evt => this.selectFriend(row.id, evt)}
                 checked = {this.isSelected(row.id)} />
        </label>
        <label className = 'center' htmlFor = {`checkbox-${row.id}`} >
          <Col>
            <Row className = 'todo-editor-collaborate-name'> {row.name} </Row>
            <Row className = 'todo-editor-collaborate-relationship'> {row.email} </Row>
          </Col>
        </label>
        <label className = 'right'>
          <Icon icon = 'md-delete' size = {24} style={{color: 'grey'}}/>
        </label>
      </ListItem>
    );
  }

  renderHeader() {
    return (
      <ListHeader> {this.props.category} </ListHeader>
    );
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

  selectFriend(id, evt) {
    const checked = evt.target.checked;
    this.props.selectFriend(id, checked);
  }

  isSelected(id) {
    return (this.props.selectedFriends[id] && this.props.selectedFriends[id] !== null);
  }

}
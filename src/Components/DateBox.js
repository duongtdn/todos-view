"use strict"

import React, { Component } from 'react'
import { Page, Toolbar, ToolbarButton, List, ListItem, ListHeader, Col, Row, Icon, Button } from 'react-onsenui'

import { formatDate } from './calendar'

export default class DateBox extends Component {
constructor(props) {
  super(props);

  this.state = { selectedDate : '' };

  this.getSelectedDate = this.getSelectedDate.bind(this);
} 

componentWillMount() {
  this.getSelectedDate(this.props);
}

componentWillReceiveProps(nextProps) {
  this.getSelectedDate(nextProps);
}

getSelectedDate(props) {
  let selectedDate = 'select a date';
  if (props.selectedDate) {
    selectedDate = formatDate(props.selectedDate);
  }
  this.setState({ selectedDate });
}

render() {
  return (
    <div className = 'datebox' onClick ={this.props.onClick} >
      <label> {this.state.selectedDate} </label>
      <Icon icon ='fa-calendar' />
    </div>
  );
}
}
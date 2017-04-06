"use strict"

import React , { Component } from 'react'
import {ListItem, Icon, Input, Col, Row, Button} from 'react-onsenui'

import calendar from '../Components/calendar'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation : '',
      editMenu : ''
    };    
  }

  componentWillMount() {
    this.setState({ editMenu : `todos-action-${this.props.platform} hide` });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== true) {
      this.setState({ editMenu : `todos-action-${this.props.platform} hide` });
    } 
  }

  render() {    
    const data = this.props.data;
    let type;
    if (data.group && this.props.taskGroup[data.group]) {
      /* issue: user may accept a task which he is not member of its group
         so we cannot get group name
         this.props.taskGroup[data.group] will be undefined
         solution: in this case, we are not showing task group, so I add one
         more condition to the if statement
      */
      type = `Group: ${this.props.taskGroup[data.group].name}`;
    } else {
      const numberOfShare = Object.keys(data.share).length; 
      type = numberOfShare > 1 ? `Members : ${numberOfShare}` : 'Private';
    }

    const urgentStyle = data.urgent ? 'todos-urgent' : '';
    let dueDate = '';
    if (data.dueDate.length !== 0) {
      const d = new Date(data.dueDate);
      dueDate = `${d.getDate()} ${calendar.month.map(d.getMonth(),'short')} `;
    }
    const today = new Date();
    let overdueStyle = '';
    if (data.dueDate.length !== 0) {
      const dueDate = new Date(data.dueDate);
      if (dueDate < today) {
        overdueStyle = 'todos-highlight todos-urgent';
      }
    }
    return (
      <ListItem className = {`${this.state.animation} ${urgentStyle} ${overdueStyle}`} key = {data.id} >
        <div className = 'left todos-check'> 
          <Input type = 'checkbox'  onChange = {() => this.completeTodo(data) } />
        </div>

        <div className = 'center' onClick = {() => this.toggleEditMenu()}>
          <div className = {this.state.editMenu}>
            <Button modifier='quiet' onClick = {() => this.openEditPage(data)}>  Edit <Icon icon = 'md-edit' /> </Button>
            {/*<Button modifier='quiet' onClick = {this.openSharePage}> Share <Icon icon = 'md-share' /> </Button>*/}
          </div>
          <div className = 'todos-text' >
            {data.text}
          </div>
          <div className = 'todos-ext'>
            <Row>
              <Col> {type} </Col>
              <Col className = {`${overdueStyle}`} style = {{textAlign : 'right'}}> {dueDate} </Col>
            </Row>
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

  toggleEditMenu() {
    const patt = /\shide/g;
    if (patt.test(this.state.editMenu)) {
      // this item is currently hidden
      this.setState({
        editMenu : `todos-action-${this.props.platform} animation-show-up`
      });
    } else {
      this.setState({
        editMenu : `todos-action-${this.props.platform} animation-hide`
      });
    }    
    this.props.setActive(this.props.data.id);

    setTimeout(() => {
      this._cleanAnimationClass();      
    }, 250);
  }

  _cleanAnimationClass() {
    const patt1 = /\sanimation-hide/g;
    const patt2 = /\sanimation-show-up/g;
    const _class = this.state.editMenu;
    if (patt1.test(_class)) {
      // this item is need to be hide
      this.setState({
        editMenu :`todos-action-${this.props.platform} hide`
      });
    } 
    if (patt2.test(_class)) {
      // this item need to be show up
      this.setState({
        editMenu :`todos-action-${this.props.platform}`
      });
    }         
  }

  openEditPage(data) {
    this.props.openEditPage(data);
  }

  openSharePage(data) {
    this.props.openSharePage(data);
  }

  completeTodo(todo) {
    
    this.setState({ animation : 'animation-swipe-right hide-children' });

    setTimeout(() => {
      this.props.completeTodo(todo);
    }, 950);
    
  }

    deleteTodo(todo) {

    this.setState({ animation : 'animation-remove hide-children' });

     setTimeout(() => {
      this.props.deleteTodo(todo);
    }, 750);

  }

}
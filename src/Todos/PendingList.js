"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation : [],
      showEditMenu : []
    };
    this.renderRow = this.renderRow.bind(this);
    this.openEditPage = this.openEditPage.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  componentWillReceiveProps() {  
    const showEditMenu = this.props.todos.map( () => {
      return `todos-action-${this.props.platform} hide`;
    });
    const animation = this.props.todos.map( () => {
      return '';
    });
    this.setState({ showEditMenu, animation });
  }

  renderRow(row, index) {
    const numberOfShare = Object.keys(row.share).length; 
    const type = numberOfShare > 1 ? `${numberOfShare} shared` : 'private';
    const bgHighlight = row.urgent ? 'todos-highlight' : '';
    const isComplete = (row.status === 'completed');
    const decoText = (row.status === 'completed') ? 'todos-text todos-completed' : 'todos-text'
    return (
      <ListItem className = {`${this.state.animation[index]} ${bgHighlight}`} key = {row.id} >
        <div className = 'left'> 
          <Input type = 'checkbox'  onChange = {() => this.completeTodo(row, index) } />
        </div>

        <div className = 'center' onClick = {() => this.toggleEditMenu(index)}>
          <div className = {this.state.showEditMenu[index]}>
            <Button modifier='quiet' onClick = {() => this.openEditPage(index)}>  Edit <Icon icon = 'md-edit' /> </Button>
            <Button modifier='quiet' onClick = {this.openSharePage}> Share <Icon icon = 'md-share' /> </Button>
          </div>
          <div className = {decoText} >
            {row.text}
          </div>
          <div className = 'todos-ext'>
            <Row>
              <Col> {type} </Col>
              <Col style = {{textAlign : 'right'}}> {row.dueDate} </Col>
            </Row>
          </div>
        </div>

        <div className = 'right' >
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

  toggleEditMenu(index) {
    const patt = /\shide/g;
    const showEditMenu = this.state.showEditMenu.map( (_class, id) => {
      if (id === index) {
        if (patt.test(_class)) {
          // this item is currently hidden
          _class = `todos-action-${this.props.platform} animation-show-up`;
        } else {
          // this item is show up, hide it
          _class = `todos-action-${this.props.platform} animation-hide`;
        }
      } else {
        _class = `todos-action-${this.props.platform} hide`;
      }
      
      return _class;
    });
    this.setState({showEditMenu});

    setTimeout(() => {
      this._cleanAnimationClass();
    }, 250);
  }

  openEditPage(index) {
    this.props.pushPage('editor', this.props.todos[index], {
      animation : 'lift'
    });
  }

  openSharePage(index) {
    console.log('open share page');
  }

  completeTodo(todo, index) {
    const animation = this.state.animation.map( (anim, id) => {
      if (id === index) {
        return 'animation-swipe-right hide-children';
      } else {
        return anim;
      }
    });
    this.setState({ animation });

    setTimeout(() => {
      this.props.completeTodo(todo);
    }, 950);
    
  }

  _cleanAnimationClass() {
    const patt1 = /\sanimation-hide/g;
    const patt2 = /\sanimation-show-up/g;
    const showEditMenu = this.state.showEditMenu.map( (_class, id) => {
      if (patt1.test(_class)) {
        // this item is currently hidden
        _class = `todos-action-${this.props.platform} hide`;
      } 
      if (patt2.test(_class)) {
        // this item is show up, hide it
        _class = `todos-action-${this.props.platform}`;
      }     
      return _class;
    });
    this.setState({showEditMenu});
  }

}

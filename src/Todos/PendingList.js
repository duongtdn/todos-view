"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditMenu : [
        `todos-action-${this.props.platform} hide`,
        `todos-action-${this.props.platform} hide`,
        `todos-action-${this.props.platform} hide`,
        `todos-action-${this.props.platform} hide`
      ]
    };
    this.renderRow = this.renderRow.bind(this);
    this.openEditPage = this.openEditPage.bind(this);
  }

  renderRow(row, index) {
    const type = row.share.length > 1 ? 'collaborative' : 'self';
    return (
      <ListItem key = {index} >
        <div className = 'left'> 
          <Input type = 'checkbox' />
        </div>

        <div className = 'center' onClick = {() => this.toggleEditMenu(index)}>
          <div className = {this.state.showEditMenu[index]}>
            <Button modifier='quiet' onClick = {() => this.openEditPage(index)}>  Edit <Icon icon = 'md-edit' /> </Button>
            <Button modifier='quiet' onClick = {this.openSharePage}> Share <Icon icon = 'md-share' /> </Button>
          </div>
          <div className = 'todos-text'>
            {row.text}
          </div>
          <div className = 'todos-ext'>
            <Row>
              <Col> {type} </Col>
              <Col style = {{textAlign : 'right'}}> {row.dueDate} </Col>
            </Row>
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

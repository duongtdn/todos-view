"use strict"

import React , { Component } from 'react'
import {Page, ListItem, List, Icon, Input, Col, Row, Button} from 'react-onsenui'

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          role : 'Collaborator', text : 'Complete Todo App', dueDate : '30-Nov', urgent : true, 
          share : [
            {uid : '001', name : 'Alex Nova', relationship : 'Friend'},
            {uid : '002', name : 'Dylan Riskerman', relationship : 'Friend'},
            {uid : '003', name : 'Olando White', relationship : 'Friend'},
          ]
        },
        {
          role : 'Owner', text : 'Study Admob', dueDate : '12-Dec', urgent : false
        },
        {
          role : 'Collaborator', text : 'Design using Onsen UI and build with Cordova', dueDate : '', urgent : true
        },
        {
          role : 'Owner', text : 'Find solutions for promoting app across multiple platform including Android, IOS, Web... or even third party vendors', dueDate : '15-Dec', urgent : false,
          share : [
            {uid : '001', name : 'Alex Nova', relationship : 'Friend'},
          ]
        }
      ],
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
              <Col> {row.role} </Col>
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
          dataSource = {this.state.data}
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
    this.props.pushPage('editor', this.state.data[index], {
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

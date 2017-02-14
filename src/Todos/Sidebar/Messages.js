"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon,
         List, ListHeader, ListItem, 
         Col, Row } from 'react-onsenui'

import { connect } from 'react-redux'
import { user, todos } from 'todos-data'

class AlertMessage extends Component {
  render() {
    return (
      <ListItem >
        <div >
          {this.props.msg.content}
        </div>
        <div style = {{textAlign: 'center', width : '100%'}} >
          <Button modifier = 'quiet' 
                  onClick = {() => this.props.deleteMessage(this.props.msg.id)} > 
            OK 
          </Button>
        </div>
      </ListItem>
    );
  }
}

class ConfirmMessage extends Component {
  render() {
    const msg = this.props.msg;
    return (
      <ListItem >
        <Col>
          <Row> <label > You're invited to join a todo </label> </Row>
          <Row> 
            <label style = {{fontSize : '14px', fontStyle : 'italic', color : 'grey'}} > 
              {msg.content}
            </label> 
          </Row>
          <Row>
            <Col> <Button modifier = 'quiet' onClick = {() => this.props.ok(msg)} > Accept </Button> </Col>
            <Col> <Button modifier = 'quiet' onClick = {() => this.props.cancel(msg)} > Decline </Button> </Col>
          </Row>
        </Col>
      </ListItem>
    );
  }
}

class Message extends Component {

  constructor(props){
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
    this.ok = this.ok.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  renderMessage(msg) {
    switch (msg.type) {
      case 'alert' :
        return <AlertMessage msg = {msg} deleteMessage = {this.props.deleteMessage} />
      case 'confirm' :
        return <ConfirmMessage msg = {msg} ok = {this.ok} cancel = {this.cancel} />
    }
  }

  render() {
    return this.renderMessage(this.props.data);
  }

  ok(msg) {
    this.props.acceptTodo(msg);
  }

  cancel(msg) {
    this.props.ignoreTodo(msg);
  }

}

class Messages extends Component {

  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);

  }

  renderHeader() {
    return (
      <ListHeader>
        <Row>
          <Col style = {{textAlign : 'left'}} > Notification </Col>
          <Col style = {{textAlign : 'right'}} >  </Col>
        </Row>
      </ListHeader>
    );
  }

  renderRow(row) {
    return (
      <Message key = {`${row.id}`} data = {row}
               acceptTodo = {this.props.acceptTodo}
               ignoreTodo = {this.props.ignoreTodo}
               deleteMessage = {this.props.deleteMessage} />
    );
  }

  render() {
    return(
      <List renderHeader = {this.renderHeader}
            dataSource = {this.props.messages}
            renderRow = {this.renderRow} >
      </List>
    )
  }

}



/* Container */

const mapStateToProps = state => {  
  const messages = [];
  for (let id in state.user.messages) {
    messages.push(state.user.messages[id]);
  }
  return { 
    messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    acceptTodo(msg) {
      dispatch(todos.accept(msg));
    },
    ignoreTodo(msg) {
      dispatch(todos.decline(msg));
    },
    deleteMessage(msgId) {
      dispatch(user.messages.delete([msgId]));
    }
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Messages)
"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon,
         List, ListHeader, ListItem, 
         Col, Row } from 'react-onsenui'

import { connect } from 'react-redux'
import { user } from 'todos-data'

class AlertMessage extends Component {
  render() {
    return (
      <ListItem >
        <div className = 'center' >
          {this.props.msg.content}
        </div>
        <div className = 'right' >
          <Button modifier = 'quiet'  > 
            <Icon icon = 'md-delete' style={{color: 'grey'}}/> 
          </Button>
        </div>
      </ListItem>
    );
  }
}

class ConfirmMessage extends Component {
  render() {
    return (
      <ListItem >
        <Col>
          <Row> <label > You're invited to join a todo </label> </Row>
          <Row> 
            <label style = {{fontSize : '14px', fontStyle : 'italic', color : 'grey'}} > 
              {this.props.msg.content}
            </label> 
          </Row>
          <Row>
            <Col> <Button modifier = 'quiet' onClick = {this.props.ok} > OK </Button> </Col>
            <Col> <Button modifier = 'quiet' onClick = {this.props.cancel} > Cancel </Button> </Col>
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
        return <AlertMessage msg = {msg} />
      case 'confirm' :
        return <ConfirmMessage msg = {msg} ok = {this.ok} cancel = {this.cancel} />
    }
  }

  render() {
    return this.renderMessage(this.props.data);
  }

  ok() {
    console.log('ok')
  }

  cancel() {
    console.log('cancel')
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
        <label> Notification </label>
        <label className = 'right'> Clean ALl </label>
      </ListHeader>
    );
  }

  renderRow(row) {
    return (
      <Message key = {`${row.id}`} data = {row} />
    );
  }

  render() {
    console.log(this.props);
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
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Messages)
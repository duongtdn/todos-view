"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon,
         List, ListHeader, ListItem, 
         Col, Row,
         Toolbar, BackButton } from 'react-onsenui'

import { connect } from 'react-redux'
import { user, todos } from 'todos-data'

class AlertMessage extends Component {
  render() {
    return (
      <ListItem className = 'msgbox' >
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
      <ListItem className = 'msgbox' >
        <Col>
          <Row> <label style = {{fontSize : '14px', fontStyle : 'italic', color : 'grey', marginBottom : '3px'}} > 
            <label style = {{color : '#1E90FF'}} > {msg.from.name} </label> invited you to join a todo 
          </label> </Row>
          <Row> 
            <div  > 
              {msg.content}
            </div> 
          </Row>
          <Row style = {{marginTop : '6px'}}>
            <Col style = {{textAlign : 'center'}}> <Button modifier = 'quiet' onClick = {() => this.props.ok(msg)} > Accept </Button> </Col>
            <Col style = {{textAlign : 'center'}}> <Button modifier = 'quiet' onClick = {() => this.props.cancel(msg)} > Decline </Button> </Col>
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

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <BackButton> 
            Back
          </BackButton  >
        </div>
      </Toolbar>
    );
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
      <div key = {`${row.id}`}  >
        <Message data = {row}
                acceptTodo = {this.props.acceptTodo}
                ignoreTodo = {this.props.ignoreTodo}
                deleteMessage = {this.props.deleteMessage} />
      </div>
    );
  }

  render() {
    return(
      <Page renderToolbar = {this.renderToolbar} >
        <List renderHeader = {this.renderHeader}
              dataSource = {this.props.messages}
              renderRow = {this.renderRow} >
        </List>
      </Page>
    )
  }

}



/* Container */

const mapStateToProps = state => {  
  const messages = [];
  for (let id in state.user.messages) {
    const msg = {...state.user.messages[id]};
    const from = {...msg.from};
    if (state.user.friends && state.user.friends[from.id]) {
      from.name = state.user.friends[from.id].name;
    }
    msg.from = from;
    messages.push(msg);
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
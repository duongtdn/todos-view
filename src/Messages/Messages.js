"use strict"

import React , { Component } from 'react'
import { Page, Button, Icon,
         List, ListHeader, ListItem, 
         Col, Row,
         Toolbar, BackButton } from 'react-onsenui'

import ons from 'onsenui'

import { connect } from 'react-redux'
import { user, todos, taskGroup } from 'todos-data'

class AlertMessage extends Component {
  render() {
    const msg = this.props.msg;
    const target = msg.todo.length > 0 ? 'todo item' : 'todo list';
    return (
      <ListItem className = 'msgbox' >
        <Col>
          <Row> <label style = {{fontSize : '14px', fontStyle : 'italic', color : 'grey', marginBottom : '3px'}} > 
            <label style = {{color : '#1E90FF'}} > {msg.from.name} </label> has removed you from {target} 
          </label> </Row>
          <Row >
            <div> {msg.content} </div>
          </Row>
          <Row style = {{marginTop : '6px'}}>
            <div style = {{textAlign: 'center', width : '100%'}} >
              <Button modifier = 'quiet' 
                      onClick = {() => this.props.deleteMessage(msg.id)} > 
                OK 
              </Button>
            </div>
          </Row>
        </Col>
      </ListItem>
    );
  }
}

class ConfirmMessage extends Component {
  render() {
    const msg = this.props.msg;
    const target = msg.todo.length > 0 ? 'todo item' : 'todo list';
    return (
      <ListItem className = 'msgbox' >
        <Col>
          <Row> <label style = {{fontSize : '14px', fontStyle : 'italic', color : 'grey', marginBottom : '3px'}} > 
            <label style = {{color : '#1E90FF'}} > {msg.from.name} </label> invited you to join a {target} 
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
    this.getFriendFromMsg = this.getFriendFromMsg.bind(this);
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
    if (msg.todo.length > 0) {
      this.props.acceptTodo(msg);
    } else if (msg.taskGroup.length > 0) {
      this.props.acceptTaskGroup('grey', msg)
    }
    this.getFriendFromMsg(msg);
  }

  cancel(msg) {
    if (msg.todo.length > 0) {
      this.props.ignoreTodo(msg);
    } else if (msg.taskGroup.length > 0) {
      this.props.declineTaskGroup(msg);
    }    
    this.getFriendFromMsg(msg);
  }

  getFriendFromMsg(msg) {
    const self = this;
    if (msg.from && msg.from.id) {
      const id = msg.from.id;
      const name = msg.from.name;
      const email = msg.from.email;
      const friends = this.props.friends;
      if (friends && friends[id]) {
        // this friend has been saved into contact book
        return;
      }
      /* invoke a dialog asking for saving this friend into contact book */
      ons.notification.confirm({
        messageHTML: `Do you want to save ${this.styleName(name)} to your Contact Book`,
        callback : ans => { 
          if (ans === 1) { 
            this.props.pushPage('friendEditor', { 
              name : name,
              email : email,
              rel : null,
              save : addToContact
            });
          }
        }
      });
    }

    function addToContact(name, rel) {
      const user = {
        id: msg.from.id,
        email: msg.from.email,
        name: name,
        lowerCaseName: name.toLowerCase(),
        relationship: rel,        
      };
      self.props.addToFriendList(user);
    }
  }

  styleName(name) {
    return `<label style = 'color: #2196f3'> ${name} </label>`;
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
                deleteMessage = {this.props.deleteMessage}
                acceptTaskGroup = {this.props.acceptTaskGroup}
                declineTaskGroup = {this.props.declineTaskGroup}
                pushPage = {this.props.pushPage}
                addToFriendList = {this.props.addToFriendList} />
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
    messages,
    friends : state.user.friends,
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
    },
    acceptTaskGroup(color, msg) {
      dispatch(taskGroup.accept(color, msg));
    },
    declineTaskGroup(msg) {
      dispatch(taskGroup.decline(msg));
    },
    addToFriendList(usr) {
      const friend = {...usr};
      friend.connected = null;
      dispatch(user.friends.add([friend]));
    },
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Messages)
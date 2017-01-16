"use strict"

import React , { Component } from 'react'
import ons from 'onsenui'
import { Page, List, ListItem, ListHeader, Input, Button, Icon, Row, Col, Dialog } from 'react-onsenui'

export default class extends Component {
  constructor(props) {
    super(props);

    this.predefinedRels = ['Family Member', 'Friend', 'Colleague', 'Other'];

    this.state = {
      name : '',
      rel : '',
      selectedRel : '',
      showOtherRelInput : 'none'
    };

  }

  componentDidMount() {
    this.setState({ name : this.props.name });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name : nextProps.name });
  }

  render() {
    return(
      <Dialog isOpen = {this.props.show}
              isCancelable = {true}
              onCancel={this.props.cancel} >
        <div className='alert-dialog-title'> Add to Friends list  </div>
        <div className='alert-dialog-content'>
          <List modifier = 'nodivider'>
            <div> Save this person as </div>
            <ListItem modifier = 'nodivider' >
              <Input  style = {{width : '100%'}}
                      value ={this.state.name} 
                      onChange = {e => this.getName(e.target.value)} />
            </ListItem>

            <div> Relationship </div>
            {this.predefinedRels.map(rel => (
              <ListItem key = {rel} tappable>
                <label style = {{minWidth : '35px'}} >
                  <Input inputId = {`radio-${rel}`}
                        type = 'radio' 
                        checked = {rel === this.state.selectedRel}
                        onChange = {() => this.getRel(rel)} />
                </label>
                <label htmlFor = {`radio-${rel}`} className = 'center'>
                  {rel}
                </label>
              </ListItem>
            ))}

            <div style = {{paddingLeft : '16px'}} >
              <Input  
                      onChange = {e => this.handleRelInput(e.target.value)} 
                      onKeyUp = { e => this.handleRelInputKeyUp(e.keyCode)}
                      style = {{width : '100%', display: this.state.showOtherRelInput}}   />
            </div>
          </List>
        </div>
        <div className='alert-dialog-footer'>
          <Row>
            <Col>
              <button className='alert-dialog-button' onClick = {this.props.cancel} >
                Cancel
              </button>
            </Col>
            <Col>
              <button className='alert-dialog-button' onClick = {() => this.props.accept(this.state.name, this.state.rel)} >
                Ok
              </button>
            </Col>
          </Row>
        </div>
      </Dialog>
    );
  }

  getName(name) {
    this.setState({ name });
  }

  getRel(rel) {
    if (rel === 'Other') {
      this.setState({ selectedRel : rel, showOtherRelInput : 'block' });
    } else {
      this.setState({ rel, selectedRel : rel, showOtherRelInput : 'none' });
    }
  }

  handleRelInput(rel) {
    if (this.state.selectedRel === 'Other') {
        this.setState({ rel });
      } 
  }

  handleRelInputKeyUp(code) {
    if (code === 13) { // enter key
      if (this.state.selectedRel === 'Other') {
        this.props.accept(this.state.name, this.state.rel);
      }
    }
  }

} 
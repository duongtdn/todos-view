"use strict"

import React , { Component } from 'react'
import { findDOMNode } from 'react-dom';

import { Input } from 'react-onsenui';

export default class extends Input {

  componentDidMount() {
    super.componentDidMount();

    /* this hack is to set autofocus */
    const node = findDOMNode(this);    
    
    (function autoFocus () {
      if (node.children.length === 0 || node.children[0].children.length === 0){
        // wait until DOM is actually mounted
        setTimeout(autoFocus, 100);
        return;
      }
      const c = node.children[0].children;
      for (let i = 0; i < c.length; i++) {
        if (c[i].tagName === 'INPUT') {
          c[i].focus();
        }
      }
    })();
   
  }
}
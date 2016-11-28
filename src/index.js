"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import {Page, Toolbar, Button} from 'react-onsenui';

class App extends Component {
  render() {
    return (
      <Page>
        <Button> Onsen UI Button </Button>
      </Page>
    );
  }
}

render(<App />, document.getElementById('app-root'));
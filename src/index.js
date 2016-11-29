"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import ons from 'onsenui'

import AppView from './AppView'

// ons.platform.select('android');
ons.platform.select('ios');

render(<AppView />, document.getElementById('app-root'));
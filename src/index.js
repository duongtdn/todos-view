"use strict"

import React , { Component } from 'react'
import { render } from 'react-dom'

import ons from 'onsenui'

import AppView from './AppView'

ons.platform.select('android');
// ons.platform.select('ios');

const platform = ons.platform.isAndroid()? 'android' : 'ios'; 

render(<AppView platform = {platform} />, document.getElementById('app-root'));
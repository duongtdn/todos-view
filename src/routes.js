"use strict"

import React from 'react'

import TodosView from './Todos/View'
import TodoEditorView from './TodoEditor/View'

export default {
  todos : { name : 'todos', view : <TodosView /> },
  editor: { name : 'editor', view : <TodoEditorView /> }
}
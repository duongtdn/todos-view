"use strict"

import React from 'react'

import TodosView from './Todos/View'
import TodoEditorView from './TodoEditor/View'
import FriendsView from './Friends/View'
import SearchView from './Search/View'
import LoginView from './Login/View'
import SignupView from './Signup/View'
import SyncView from './Sync/View'

export default {
  todos : { name : 'todos', view : <TodosView /> },
  editor: { name : 'editor', view : <TodoEditorView /> },
  friends : { name : 'friends', view : <FriendsView /> },
  search : { name : 'search', view : <SearchView />},
  login : { name : 'login', view : <LoginView />},
  signup : { name : 'signup', view : <SignupView />},
  sync : { name : 'sync', view : <SyncView />}
}
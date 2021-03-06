"use strict"

import React from 'react'

import TodosView from './Todos/View'
import TodoEditorView from './TodoEditor/View'
import FriendsView from './Friends/View'
import LoginView from './Login/View'
import SignupView from './Signup/View'
import SyncView from './Sync/View'
import LogoutView from './Logout/View'
import ChangePSWView from './Password/ChangeView'
import ResetPSWView from './Password/ResetView'
import Messages from './Messages/Messages'
import FriendEditorView from './Friends/FriendEditor'
import TaskGroupEditor from './TaskGroup/TaskGroupEditor'
import TaskGroupList from './TaskGroup/TaskGroupList'
import DatePicker from './Components/DatePicker'

export default {
  todos : { name : 'todos', view : <TodosView /> },
  editor: { name : 'editor', view : <TodoEditorView /> },
  friends : { name : 'friends', view : <FriendsView /> },
  login : { name : 'login', view : <LoginView />},
  relogin : { name : 'relogin', view : <LoginView />},  // workaround for onsenui resetPage issue
  signup : { name : 'signup', view : <SignupView />},
  sync : { name : 'sync', view : <SyncView />},
  logout : { name : 'logout', view : <LogoutView />},
  changePSW : { name : 'changePSW', view : <ChangePSWView />},
  resetPSW : { name : 'resetPSW', view : <ResetPSWView />},
  messages : { name : 'messages', view : <Messages />},
  friendEditor : { name : 'friendEditor', view : <FriendEditorView />},
  taskGroupEditor : { name : 'taskGroupEditor', view : <TaskGroupEditor />},
  taskGroupList : { name : 'taskGroupList', view : <TaskGroupList/>},
  datePicker : { name : 'datePicker', view : <DatePicker />}
}
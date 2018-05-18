import { combineReducers } from 'redux'
import login from './login'
import fetch from './fetch'

export default combineReducers({
  login,
  fetch
})
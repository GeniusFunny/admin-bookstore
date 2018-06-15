import { combineReducers } from 'redux'
import court from './court'
import bookList from './bookList'
import personalCenter from './personalCenter'
import login from './login'
import management from './management'

export default combineReducers({
  login: login,
  court: court,
  bookList: bookList,
  personalCenter: personalCenter,
  management: management
})
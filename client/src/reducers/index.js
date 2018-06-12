import { combineReducers } from 'redux'
import court from './court'
import bookList from './bookList'

export default combineReducers({
  court,
  bookList
})
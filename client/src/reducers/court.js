import {DELETE_BOOK, RECEIVE_POSTS, REQUEST_POSTS, EDIT_BOOK_COUNT, GET_BOOK_LIST} from '../actions/court'
import {combineReducers} from 'redux'
const posts = (state = {
  res: {},
  isFetching: false
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        res: action.res
      })
    default:
      return state
  }
}
const postsByCourt = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.api]: posts(state[action.api], action)
      })
    default:
      return state
  }
}

const court = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOK_LIST:
      return action.api
    case EDIT_BOOK_COUNT:
      return action.api
    case DELETE_BOOK:
      return action.api
    case 'SELECT_BOOK':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.bookId === action.id) {
            return {
              ...item,
              isSelected: true
            }
          } else {
            return item
          }
        })
      }
    case 'CANCEL_SELECT_BOOk':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.bookId === action.id) {
            return {
              ...item,
              isSelected: false
            }
          } else {
            return item
          }
        })
      }
    case 'PURCHASE':
      return {
        ...state,
        data: state.data.filter(item => !item.isSelected)
      }
    default:
      return state
  }
}

const rootreducer = combineReducers({
  court,
  postsByCourt
})

export default rootreducer
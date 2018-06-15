import {
  GET_USER_LIST_MANAGEMENT,
  GET_BILL_LIST_MANAGEMENT,
  EDIT_BILL_MANAGEMENT,
  GET_BOOK_LIST_MANAGEMENT,
  ADD_BOOK_MANAGEMENT,
  EDIT_BOOK_MANAGEMENT,
  DELETE_BOOK_MANAGEMENT,
  FIND_BOOK_MANAGEMENT
} from '../constants/actionType'

const management = (state = {
  path: '',
  bookList: [],
  userList: [],
  billList: []
}, action) => {
  switch (action.type) {
    case GET_BOOK_LIST_MANAGEMENT:
      return Object.assign({}, state, {bookList: action.data})
    case ADD_BOOK_MANAGEMENT:
      return Object.assign({}, state, {bookList: state.bookList.push(action.data)})
    case EDIT_BOOK_MANAGEMENT:
      return Object.assign({}, state, {bookList: state.bookList.map(item => {
        if (item.bookId === action.data.bookId) {
          return action.data
        }
        return item
      })})
    case DELETE_BOOK_MANAGEMENT:
      return Object.assign({}, state, {bookList: state.bookList.filter(item => item.bookId !== action.bookId)})
    case FIND_BOOK_MANAGEMENT:
      return Object.assign({}, state, {bookList: [action.data]})
    case GET_USER_LIST_MANAGEMENT:
      return Object.assign({}, state, {userList: action.data})
    case GET_BILL_LIST_MANAGEMENT:
      return Object.assign({}, state, {billList: action.data})
    case EDIT_BILL_MANAGEMENT:
      return Object.assign({}, state)
    default:
      return state
  }
}
export default management
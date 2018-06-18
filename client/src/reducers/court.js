import {
  REQUEST_FAILURE,
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  DELETE_BOOK,
  RECEIVE_STATUS,
  COMPUTED_COURT_MONEY,
  COMPUTED_COURT_COUNT,
  EDIT_BOOK_COUNT,
  SELECT_BOOK_ALL,
  SELECT_BOOK,
  PURCHASE_SUCCESS
} from '../constants/actionType'

const calcCount = (data) => {
  let result = 0
  data.forEach(item => {
    if (item.isSelected) {
      result += item.count
    }
  })
  return result
}

const calcMoney = (data) => {
  let result = 0
  data.forEach(item => {
    if (item.isSelected) {
      result += item.count * item.price
    }
  })
  return result
}

const asyncCourt = (state = {
  data: [],
  isFetching: false,
  totalMoney: 0,
  totalCount: 0
}, action) => {
  switch (action.type) {
    case RECEIVE_STATUS:
      return Object.assign({}, state, {status: action.status})
    case REQUEST_FAILURE:
      return Object.assign({}, state, {isFetching: false, err: action.err})
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {isFetching: true})
    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {isFetching: false, data: action.products.map(item => ({
          ...item,
          isSelected: true
        }))})
    case EDIT_BOOK_COUNT:
      return Object.assign({}, state, {data: state.data.map(item => {
        if (item.bookId === action.bookId) {
          item.count = action.count
        }
        return item
        })})
    case SELECT_BOOK:
      return Object.assign({}, state, {data: state.data.map(item => {
        if (item.bookId === action.bookId) {
          item.isSelected = !item.isSelected
        }
        return item
        })})
    case SELECT_BOOK_ALL:
      return Object.assign({}, state, {data: state.data.map(item => ({
          ...item,
          isSelected: true
        }))})
    case DELETE_BOOK:
      return Object.assign({}, state, {data: state.data.filter(item => item.bookId !== action.bookId)})
    case COMPUTED_COURT_COUNT:
      return Object.assign({}, state, {totalCount: calcCount(state.data)})
    case COMPUTED_COURT_MONEY:
      return Object.assign({}, state, {totalMoney: calcMoney(state.data)})
    case PURCHASE_SUCCESS:
      return Object.assign({}, state, {data: state.data.filter(item => {
        let index = -1
          action.books.forEach(selectedBook => {
            if (selectedBook.bookId === item.bookId) {
              index = 1
            }
          })
          return index === -1
        })})
    default:
      return state
  }
}

export default asyncCourt
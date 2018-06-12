import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt} from "../api/Api"
import {REQUEST_PRODUCTS, RECEIVE_PRODUCTS, REQUEST_FAILURE, DELETE_BOOK, EDIT_BOOK_COUNT, RECEIVE_STATUS, COMPUTED_COURT_COUNT, COMPUTED_COURT_MONEY, SELECT_BOOK, SELECT_BOOK_ALL} from '../constants/actionType'

const requestFailure = (err) => ({
  type: REQUEST_FAILURE,
  err
})
const receiveResponseStatus = (status) => ({
  type: RECEIVE_STATUS,
  status
})

const requestProducts = () => ({
  type: REQUEST_PRODUCTS
})
const receiveProducts = (products) => ({
  type: RECEIVE_PRODUCTS,
  products
})
const getAllProducts = () => dispatch => {
  GetBooksInCourt()
    .then(res => {
      dispatch(receiveProducts(res.data))
      dispatch(receiveResponseStatus(res.status))
      dispatch(computedCourtCount())
      dispatch(computedCourtMoney())
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

const editBookCount = (bookId, count) => ({
  type: EDIT_BOOK_COUNT,
  bookId: bookId,
  count: count
})
const asyncEditBookCount = (bookId, count) => dispatch => {
  EditCourtBookCount({bookId: bookId, count: count})
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(editBookCount(bookId, count))
      dispatch(computedCourtCount())
      dispatch(computedCourtMoney())
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  bookId: bookId
})
const asyncDeleteBook = (bookId) => dispatch => {
  DeleteBookFromCourt({bookId: bookId})
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(deleteBook(bookId))
      dispatch(computedCourtCount())
      dispatch(computedCourtMoney())
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

// const asyncDeleteAllBooks = () => dispatch => {
//
// }
const computedCourtCount = () => ({
  type: COMPUTED_COURT_COUNT
})

const computedCourtMoney = () => ({
  type: COMPUTED_COURT_MONEY
})

const selectBook = (bookId) => ({
  type: SELECT_BOOK,
  bookId: bookId
})

const selectBookAll = () => ({
  type: SELECT_BOOK_ALL
})

const cancelSelectBook = (bookId) => ({
  type: 'Cancel_SELECT_BOOK',
  id: bookId
})

export {
  getAllProducts,
  requestFailure,
  computedCourtCount,
  computedCourtMoney,
  receiveResponseStatus,
  requestProducts,
  asyncEditBookCount,
  asyncDeleteBook,
  selectBook,
  selectBookAll,
  cancelSelectBook,
}
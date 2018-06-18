import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt, Purchase} from "../api/Api"
import {REQUEST_PRODUCTS, RECEIVE_PRODUCTS, DELETE_BOOK, EDIT_BOOK_COUNT, COMPUTED_COURT_COUNT, COMPUTED_COURT_MONEY, SELECT_BOOK, SELECT_BOOK_ALL, PURCHASE_SUCCESS} from '../constants/actionType'
import {receiveResponseStatus, requestFailure} from './common'
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
const computedCourtCount = () => ({
  type: COMPUTED_COURT_COUNT
})

const computedCourtMoney = () => ({
  type: COMPUTED_COURT_MONEY
})

const select = (bookId) => ({
  type: SELECT_BOOK,
  bookId: bookId
})
const selectBook = (bookId) => dispatch => {
  dispatch(select(bookId))
  dispatch(computedCourtCount())
  dispatch(computedCourtMoney())
}

const selectAll = () => ({
  type: SELECT_BOOK_ALL
})
const selectBookAll = () => dispatch => {
  dispatch(selectAll())
  dispatch(computedCourtCount())
  dispatch(computedCourtMoney())
}

const purchaseSuccess = (data) => ({
  type: PURCHASE_SUCCESS,
  books: data
})
const asyncPurchase = (data) => dispatch => {
  Purchase(data)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      if (res.status === 0) {
        dispatch(purchaseSuccess(data.books))
        dispatch(computedCourtCount())
        dispatch(computedCourtMoney())
      }
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
export {
  getAllProducts,
  computedCourtCount,
  computedCourtMoney,
  asyncEditBookCount,
  asyncDeleteBook,
  selectBook,
  selectBookAll,
  asyncPurchase
}
import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt, Purchase} from "../api/Api"
import {RECEIVE_PRODUCTS, DELETE_BOOK, EDIT_BOOK_COUNT, COMPUTED_COURT_COUNT, COMPUTED_COURT_MONEY, SELECT_BOOK, SELECT_BOOK_ALL, PURCHASE_SUCCESS} from '../constants/actionType'
import {receiveResponseStatus, requestFailure} from './common'
import makeActionCreator from './actionCreator'

const receiveProducts = makeActionCreator(RECEIVE_PRODUCTS, 'products')
const editBookCount = makeActionCreator(EDIT_BOOK_COUNT, 'bookId', 'count')
const deleteBook = makeActionCreator(DELETE_BOOK, 'bookId')
const computedCourtCount = makeActionCreator(COMPUTED_COURT_COUNT)
const computedCourtMoney = makeActionCreator(COMPUTED_COURT_MONEY)
const select = makeActionCreator(SELECT_BOOK, 'bookId')
const purchaseSuccess = makeActionCreator(PURCHASE_SUCCESS, 'data')
const selectAll = makeActionCreator(SELECT_BOOK_ALL)

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

const selectBook = (bookId) => dispatch => {
  dispatch(select(bookId))
  dispatch(computedCourtCount())
  dispatch(computedCourtMoney())
}

const selectBookAll = () => dispatch => {
  dispatch(selectAll())
  dispatch(computedCourtCount())
  dispatch(computedCourtMoney())
}

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
  asyncEditBookCount,
  asyncDeleteBook,
  selectBook,
  selectBookAll,
  asyncPurchase
}
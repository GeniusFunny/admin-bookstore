import {
  ADD_BOOK_TO_COURT,
  SEARCH_BOOK,
  GET_BOOK_MARKET,
  GET_BOOK_SEARCH_RES,
  CLOSE_MESSAGE,
  ADD_BOOK_TO_COURT_SUCCESS, ADD_BOOK_TO_COURT_FAILURE, UPDATE_KEYWORD
} from '../constants/actionType'
import {requestFailure, receiveResponseStatus} from './common'
import {AddBookToCourt, SearchBook, GetBookList} from '../api/Api'
import makeActionCreator from './actionCreator'

const getBookList = makeActionCreator(GET_BOOK_MARKET, 'data')
const addBookSuccess = makeActionCreator(ADD_BOOK_TO_COURT_SUCCESS, 'message')
const addBookFailure = makeActionCreator(ADD_BOOK_TO_COURT_FAILURE, 'message')
const addBookToCourt = makeActionCreator(ADD_BOOK_TO_COURT, 'bookId')
const updateKeyWord = makeActionCreator(UPDATE_KEYWORD, 'keyWord')
const closeMessage = makeActionCreator(CLOSE_MESSAGE)
const searchBook = makeActionCreator(SEARCH_BOOK, 'keyWord')
const getSearchBookRes = makeActionCreator(GET_BOOK_SEARCH_RES, 'data')

const asyncGetBookList = () => dispatch => {
  GetBookList()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getBookList(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const asyncAddBookToCourt = (bookId) => dispatch => {
  dispatch(addBookToCourt(bookId))
  AddBookToCourt({bookId: bookId})
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      if (res.status === 0) {
        dispatch(addBookSuccess({
          open: true,
          message: '成功加入购物车',
          type: 'success'
        }))
      } else {
        dispatch(addBookFailure({
          open: true,
          message: '加入购物车失败',
          type: 'error'
        }))
      }
    })
    .catch(err => {
      dispatch(requestFailure(err))
      dispatch(addBookSuccess({
        open: true,
        message: '加入购物车失败',
        type: 'error'
      }))
    })
}
const asyncSearchBook = (keyWord) => dispatch => {
  dispatch(searchBook(keyWord))
  SearchBook({keyWord: keyWord})
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getSearchBookRes(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}

export {
  asyncAddBookToCourt,
  asyncSearchBook,
  asyncGetBookList,
  updateKeyWord,
  closeMessage
}
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

const getBookList = (data) => ({
  type: GET_BOOK_MARKET,
  data: data
})
const addBookSuccess = (message) => ({
  type: ADD_BOOK_TO_COURT_SUCCESS,
  message
})
const addBookFailure = (message) => ({
  type: ADD_BOOK_TO_COURT_FAILURE,
  message
})
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

const addBookToCourt = (bookId) => ({
  type: ADD_BOOK_TO_COURT,
  bookId: bookId
})
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
        dispatch(addBookSuccess({
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
const updateKeyWord = (keyWord) => ({
  type: UPDATE_KEYWORD,
  keyWord
})
const closeMessage = () => ({
  type: CLOSE_MESSAGE
})
const searchBook = (keyWord) => ({
  type: SEARCH_BOOK,
  keyWord
})
const getSearchBookRes = (data) => ({
  type: GET_BOOK_SEARCH_RES,
  data: data
})
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
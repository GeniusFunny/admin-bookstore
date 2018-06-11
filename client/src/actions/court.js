import {GetBooksInCourt, EditCourtBookCount, DeleteBookFromCourt} from "../api/Api"

const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'
const GET_BOOK_LIST = 'GET_BOOK_LIST'
const EDIT_BOOK_COUNT = 'EDIT_BOOK_COUNT'
const DELETE_BOOK = 'DELETE_BOOK'

const requestPosts = (api) => {
  return {
    type: REQUEST_POSTS,
    api
  }
}
const receivePosts = (api, res) => {
  return {
    type: RECEIVE_POSTS,
    res: res,
    api
  }
}
const getBookList = (api) => ({
  type: GET_BOOK_LIST,
  api
})

const asyncGetBookList = (getBookList) => {
  return dispatch => {
    dispatch(requestPosts(getBookList))
    return GetBooksInCourt
      .then(res => {
        dispatch(receivePosts(getBookList(res)))
      })
  }
}
const asyncDeleteBook = (bookId, deleteBook) => {
  return dispatch => {
    dispatch(requestPosts(deleteBook))
    return DeleteBookFromCourt(bookId)
      .then(res => {
        dispatch(receivePosts(res))
      })
  }
}
const asyncEditBookCount = (bookId, newCount, editBookCount) => {
  return dispatch => {
    dispatch(requestPosts(editBookCount))
    return EditCourtBookCount(bookId, newCount)
      .then(res => {
        dispatch(receivePosts(res))
      })
  }
}

const editBookCount = (bookId, count) => ({
  type: EDIT_BOOK_COUNT,
  count: count,
  id: bookId
})

const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  id: bookId
})

const selectBook = (bookId) => ({
  type: 'SELECT_BOOK',
  id: bookId
})

const purchase = () => ({
  type: 'PURCHASE'
})

const cancelSelectBook = (bookId) => ({
  type: 'Cancel_SELECT_BOOK',
  id: bookId
})

export {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  EDIT_BOOK_COUNT,
  DELETE_BOOK,
  GET_BOOK_LIST,
  editBookCount,
  deleteBook,
  purchase,
  selectBook,
  cancelSelectBook,
  getBookList,
  asyncDeleteBook,
  asyncEditBookCount,
  asyncGetBookList
}
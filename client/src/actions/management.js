import {
  FIND_BOOK_MANAGEMENT,
  EDIT_BOOK_MANAGEMENT,
  EDIT_BILL_MANAGEMENT,
  DELETE_BOOK_MANAGEMENT,
  ADD_BOOK_MANAGEMENT,
  GET_USER_LIST_MANAGEMENT,
  GET_BILL_LIST_MANAGEMENT,
  GET_BOOK_LIST_MANAGEMENT
} from '../constants/actionType'
import {requestFailure, receiveResponseStatus} from './common'
import {
  GetBillListManagement,
  GetUserListManagement,
  FindBookManagement,
  EditBookManagement,
  EditBillManagement,
  DeleteBookManagement,
  AddBookManagement,
  GetBookListManagement
} from '../api/Api'
import BookList from "../containers/BookList";
const findBook = (data) => ({
  type: FIND_BOOK_MANAGEMENT,
  data
})
const asyncFindBook = (keyWord) => dispatch => {
  FindBookManagement(keyWord)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(findBook(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const deleteBook = (bookId) => ({
  type: DELETE_BOOK_MANAGEMENT,
  bookId
})
const asyncDeleteBook = (bookId) => dispatch => {
  DeleteBookManagement(bookId)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(deleteBook(bookId))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const editBook = (data) => ({
  type: EDIT_BOOK_MANAGEMENT,
  data
})
const asyncEditBook = (data) => dispatch => {
  EditBookManagement(data)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(editBook(data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const addBook = (data) => ({
  type:ADD_BOOK_MANAGEMENT,
  data
})
const asyncAddBook = (data) => dispatch => {
  AddBookManagement(data)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(addBook(Object.assign({}, data, {bookId: res.data.bookId})))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const getBook = (data) => ({
  type: GET_BOOK_LIST_MANAGEMENT,
  data
})
const asyncGetBookList = () => dispatch => {
  GetBookListManagement()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getBook(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })

}
const getBill = (data) => ({
  type: GET_BILL_LIST_MANAGEMENT,
  data
})
const asyncGetBill = () => dispatch => {
  GetBillListManagement()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getBill(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const getUsers = (data) => ({
  type: GET_USER_LIST_MANAGEMENT,
  data
})
const asyncGetUsers = () => dispatch => {
  GetUserListManagement()
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(getUsers(res.data))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
const editBill = (billId) => ({
  type: EDIT_BILL_MANAGEMENT,
  billId
})
const asyncEditBill = (billId) => dispatch => {
  EditBillManagement(billId)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(editBill(billId))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
export {
  asyncFindBook,
  asyncDeleteBook,
  asyncEditBook,
  asyncAddBook,
  asyncGetBookList,
  asyncGetBill,
  asyncEditBill,
  asyncGetUsers
}
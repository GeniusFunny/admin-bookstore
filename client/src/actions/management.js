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
import makeActionCreator from './actionCreator'

const findBook = makeActionCreator(FIND_BOOK_MANAGEMENT, 'data')
const deleteBook = makeActionCreator(DELETE_BOOK_MANAGEMENT, 'bookId')
const editBook = makeActionCreator(EDIT_BOOK_MANAGEMENT, 'data')
const addBook = makeActionCreator(ADD_BOOK_MANAGEMENT, 'data')
const getBook = makeActionCreator(GET_BOOK_LIST_MANAGEMENT, 'data')
const getBill = makeActionCreator(GET_BILL_LIST_MANAGEMENT, 'data')
const getUsers = makeActionCreator(GET_USER_LIST_MANAGEMENT, 'data')
const editBill = makeActionCreator(EDIT_BILL_MANAGEMENT, 'billId')

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
const asyncDeleteBook = (data) => dispatch => {
  DeleteBookManagement(data)
    .then(res => {
      dispatch(receiveResponseStatus(res.status))
      dispatch(deleteBook(data.bookId))
    })
    .catch(err => {
      dispatch(requestFailure(err))
    })
}
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
const getBookList = (data) => ({
  type: 'GET_BOOK',
  data: data
})

const editBookCount = (bookId, count) => ({
  type: 'EDIT_BOOK_COUNT',
  count: count,
  id: bookId
})

const deleteBook = (bookId) => ({
  type: 'DELETE_BOOK',
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
  editBookCount,
  deleteBook,
  purchase,
  selectBook,
  cancelSelectBook,
  getBookList
}
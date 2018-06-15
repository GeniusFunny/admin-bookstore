import ajax from './ajax'
const Test = () => {
  return ajax('test', 'get')
}
const Register = (data) => {
  return ajax('register', 'post', data)
}
const GetBookList = () => {
  return ajax('bookList', 'get')
}
const AddBook = (data) => {
  return ajax('book', 'post', data)
}
const SearchBook = (data) => {
  return ajax('book', 'get', data)
}
const AddBookToCourt = (data) => {
  return ajax('court/add', 'put', data)
}
const DeleteBookFromCourt = (data) => {
  return ajax('court/book', 'delete', data)
}
const Purchase = (data) => {
  return ajax('court/purchase', 'post', data)
}
const GetBooksInCourt = () => {
  return ajax('court/list', 'get')
}
const Login = (data) => {
  return ajax('login', 'post', data)
}
const EditCourtBookCount = (data) => {
  return ajax('court/book', 'post', data)
}
const GetUserInfo = () => {
  return ajax('user/info', 'get')
}
const EditUserInfo = (data) => {
  return ajax('user/info', 'post', data)
}
const GetUserBill = () => {
  return ajax('user/bill', 'get')
}
const GetBookInfo = (data) => {
  return ajax('book/info', 'post', data)
}
export {
  Test,
  Register,
  GetBookList,
  AddBook,
  SearchBook,
  AddBookToCourt,
  GetBooksInCourt,
  DeleteBookFromCourt,
  Purchase,
  GetUserInfo,
  EditUserInfo,
  Login,
  EditCourtBookCount,
  GetUserBill,
  GetBookInfo
}
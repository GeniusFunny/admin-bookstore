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
export {
  Test,
  Register,
  GetBookList,
  AddBook,
  SearchBook
}
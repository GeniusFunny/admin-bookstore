const GetBookDao = require('../../dao/book').getBookDao

async function GetBookService (bookId) {
  return await GetBookDao(bookId)
}
module.exports = GetBookService
const insertBookDao = require('../../dao/book').insertBookDao

async function addBookService(bookName, author, price) {
  let data = await insertBookDao(bookName, author, price)
  return data
}

module.exports = addBookService